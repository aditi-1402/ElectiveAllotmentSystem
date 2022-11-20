const express = require("express");
const { format } = require("express/lib/response");
const res = require("express/lib/response");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const semesterMetaData = {
  5: {
    oe: 0,
    pe: 1,
  },
  6: {
    oe: 1,
    pe: 1,
  },
  7: {
    oe: 0,
    pe: 2,
  },
  8: {
    oe: 1,
    pe: 1,
  },
};

recordRoutes.route("/setup/subjectPool").post(async function (req, res) {
  let data = req.body;
  let db_connect = dbo.getDb();
  db_connect.collection("SubjectPool").insertOne(data, function (err, res) {
    if (err) throw err;
    console.log("Inserted Record: ", data);
  });
  res.status(200).json({ success: true });
});

recordRoutes.route("/register/bulk").post(async function (req, res) {
  //csv file email,semester
  console.log("Request Body: ", req.body);
  let data = req.body;
  let db_connect = dbo.getDb();
  data.map((f) => {
    f.password = f.name.substring(0, 2) + f.registerNumber;
    f.oe = [];
    f.pe = [];
    f.maxOe = semesterMetaData[f.currentSemester].oe;
    f.maxPe = semesterMetaData[f.currentSemester].pe;
    db_connect.collection("Student").insertOne(f, function (err, res) {
      if (err) throw err;
      console.log("Inserted Record: ", f.registerNumber);
    });
  });
  res.status(200).json({ success: true });
});

recordRoutes.route("/register").post(async function (req, res) {
  console.log("Request Body: ", req.body);
  let data = req.body;
  data.oe = [];
  data.pe = [];
  data.maxOe = semesterMetaData[data.currentSemester].oe;
  data.maxPe = semesterMetaData[data.currentSemester].pe;
  let db_connect = dbo.getDb();
  db_connect.collection("Student").insertOne(data, function (err, res) {
    if (err) throw err;
    console.log("Inserted Record: ", data.registerNumber);
  });
  res.status(200).json({ success: true });
});

recordRoutes.route("/login").post(async function (req, res) {
  let db_connect = dbo.getDb();
  let em = req.body.email;
  let pw = req.body.password;
  var myDocument = await db_connect
    .collection("Student")
    .findOne({ email: em });
  if (myDocument) {
    var myPass = myDocument.password;
    if (myPass == pw) res.status(200).json({ uid: myDocument._id });
    else res.sendStatus(400);
  } else res.sendStatus(400);
});

recordRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Student")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

async function subtractSubjectInPool(semData, elective, subject) {
  let db_connect = dbo.getDb();
let isOk = false;
  console.log(semData, elective, subject);
  if (semData[elective][`${subject}`] > 0) {
    semData[elective][subject] -= 1;
    const cursor = await db_connect
      .collection("SubjectPool")
      .update({ _id: ObjectId(semData._id) }, { $set: { ...semData } });
    isOk = cursor.modifiedCount > 0;
  }
  return isOk;
}
async function chooseSubjectOnPriority(data, userData) {
  let db_connect = dbo.getDb();

  const { subject1, subject2, subject3 } = data;
  let semesterMetaData = null;
  let selectedSubject = null;

  const cursor = await db_connect
    .collection("SubjectPool")
    .find({ semesterNumber: userData.currentSemester });

  while (await cursor.hasNext()) {
    semesterMetaData = await cursor.next();
  }

  if (semesterMetaData) {
    if (data.oe && semesterMetaData.oe) {
      if (semesterMetaData.oe[subject1] > 0) {
        selectedSubject = subject1;
      } else if (semesterMetaData.oe[subject2] > 0) {
        selectedSubject = subject2;
      } else if (semesterMetaData.oe[subject3] > 0) {
        selectedSubject = subject3;
      }
      if (selectedSubject) {
        const res = await subtractSubjectInPool(
          semesterMetaData,
          "oe",
          selectedSubject
        );
      }
    }
    if (data.pe && semesterMetaData.pe) {
      if (semesterMetaData.pe[subject1] > 0) {
        selectedSubject = subject1;
      } else if (semesterMetaData.pe[subject2] > 0) {
        selectedSubject = subject2;
      } else if (semesterMetaData.pe[subject3] > 0) {
        selectedSubject = subject3;
      }
      if (selectedSubject) {
        const res = await subtractSubjectInPool(
          semesterMetaData,
          "pe",
          selectedSubject
        );
      }
    }
    console.log("Selected Subject: ", selectedSubject);
  }

  return selectedSubject;
}

recordRoutes.route("/submit").post(async (req, res) => {
  console.log("Request Body: ", req.body);
  let db_connect = dbo.getDb();
  let data = req.body;
  let userData = null;
  let alloted = null;
  const cursor = await db_connect
    .collection("Student")
    .find({ _id: ObjectId(data.userid) });

  while (await cursor.hasNext()) {
    userData = await cursor.next();
  }
  console.log("User: ", userData);
  if (userData != null) {
    let updateData = null;
    if (data.pe) {
      const allotedSubject = await chooseSubjectOnPriority(data, userData);
      console.log("Alotted Subject: ", allotedSubject);
      alloted=allotedSubject;
      if (allotedSubject) {
        const subs = {
          subject1: data.subject1,
          subject2: data.subject2,
          subject3: data.subject3,
          selected: allotedSubject,
        };
        if (userData.pe.length > 0) {
          updateData = { pe: [...userData.pe, subs] };
        } else {
          updateData = { pe: [subs] };
        }
      }
    }
    if (data.oe) {
      const allotedSubject = await chooseSubjectOnPriority(data, userData);
      if (allotedSubject) {
        console.log("Alotted Subject: ", allotedSubject);
        alloted=allotedSubject;
        const subs = {
          subject1: data.subject1,
          subject2: data.subject2,
          subject3: data.subject3,
          selected: allotedSubject,
        };
        if (userData.oe.length > 0) {
          updateData = { oe: [...userData.oe, subs] };
        } else {
          updateData = { oe: [subs] };
        }
      }
    }
    if (updateData) {
      db_connect
        .collection("Student")
        .update(
          { _id: ObjectId(data.userid) },
          { $set: { ...updateData } },
          function (err, d) {
            if (err) throw err;
            console.log("Enrolled user ${userData.name} to ${alloted}");
            d.selected=alloted;
            res.json(d);
            console.log(d);
          }
        );
    } else {
      res.json("already filled up!");
    }
  }
});

recordRoutes.route("/:id").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Student").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    res.json(obj);
  });
});

module.exports = recordRoutes;