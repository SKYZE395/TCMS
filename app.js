const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded({ extended: true });
const app = express();
const ejs = require('ejs');

app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aakashisgood@123",
    database: "nodejs"
});

app.set('view engine', 'ejs');

connection.connect(function (error) {
    if (error)
        throw error;
    else{
        console.log("listening to port 4000");
        console.log("DB connected successfully");
    }
});

var u;
var p;

var selectedsection;
var sec;

app.get('/', (req, res) => {
    res.render('index', { msg1: '' });
});

app.get('/changepass', (req, res) => {
    res.render('changepass', { msg: '' });
});

app.get('/home', function (req, res) {
    res.render('home');
});

app.post('/home/time_table/mon_morlab_tt',encoder,(req, res) => {
    selectedsection = req.body.Sec;
    connection.query('update '+selectedsection+' set type = "mor"',(error,results)=>{
        if(error){
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
        else{
            res.render(__dirname + "/views/mon_morlab.ejs");
        }
    })
});

app.post('/home/time_table/mon_evelab_tt',encoder,(req, res) => {
    selectedsection = req.body.Sec1;
    connection.query('update '+selectedsection+' set type = "eve"',(error,results)=>{
        if(error){
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
        else{
            res.render(__dirname + "/views/mon_eve.ejs");
        }
    })
});

app.get('/options', (req, res) => {
    const flags = req.query.flags;

    connection.query('SELECT name from teacher_avail where '+flags[0]+'=0 and '+flags[1]+'=0 and '+flags[2]+'=0 and '+flags[3]+'=0 and '+flags[4]+'=0 and '+flags[5]+'=0 and '+flags[6]+'=0 ', (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(results);
        }
    });
});

app.get('/setflag',(req,res)=>{
    const selectedsub = req.query.selectedsub;
    connection.query('update '+selectedsection+' set flag = "1" where subject_name = ?',[selectedsub],(error,results)=>{
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(results);
        }
    })
})

app.get('/subs',(req,res)=>{
    connection.query('select value,subject_name from '+selectedsection+' where flag="0"',(error,results)=>{
        if(error){
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
        else{
            res.json(results);
        }
    });
})

app.get('/laboptions', (req, res) => {
    const flags = req.query.flags;
    connection.query('SELECT name FROM teacher_avail where '+flags[0]+'=0 and '+flags[1]+'=0 and '+flags[2]+'=0 and '+flags[3]+'=0 ', (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(results);
        }
    });
});

app.get('/save',async(req,res)=>{
    const faculty = req.query.faculty;
    const subs = req.query.subs;
    const sform = req.query.sform;
    try{
        const q1 = connection.query('update '+selectedsection+' set ename = ? where subject_name = ?',[faculty[0],subs[0]]);
        const q1_1 = connection.query('update '+selectedsection+' set sub1 = ?',[sform[0]]);
        const q2 = connection.query('update '+selectedsection+' set ename = ? where subject_name = ?',[faculty[1],subs[1]]);
        const q2_1 = connection.query('update '+selectedsection+' set sub2 = ?',[sform[1]]);
        const q3 = connection.query('update '+selectedsection+' set ename = ? where subject_name = ?',[faculty[2],subs[2]]);
        const q3_1 = connection.query('update '+selectedsection+' set sub3 = ?',[sform[2]]);
        const q4 = connection.query('update '+selectedsection+' set ename = ? where subject_name = ?',[faculty[3],subs[3]]);
        const q4_1 = connection.query('update '+selectedsection+' set sub4 = ?',[sform[3]]);
        const q5 = connection.query('update '+selectedsection+' set ename = ? where subject_name = ?',[faculty[4],subs[4]]);
        const q5_1 = connection.query('update '+selectedsection+' set sub5 = ?',[sform[4]]);
        const q6 = connection.query('update '+selectedsection+' set ename = ? where subject_name = ?',[faculty[5],subs[5]]);
        const q6_1 = connection.query('update '+selectedsection+' set sub6 = ?',[sform[5]]);

        const q7 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%1%"',[faculty[6],faculty[18],subs[6]]);
        const q7_1 = connection.query('update '+selectedsection+' set lab11 = ?',[sform[6]]);
        const q9 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%1%"',[faculty[7],faculty[19],subs[7]]);
        const q9_1 = connection.query('update '+selectedsection+' set lab21 = ?',[sform[7]]);
        const q11 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%1%"',[faculty[8],faculty[20],subs[8]]);
        const q11_1 = connection.query('update '+selectedsection+' set lab31 = ?',[sform[8]]);
        const q13 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%1%"',[faculty[9],faculty[21],subs[9]]);
        const q13_1 = connection.query('update '+selectedsection+' set lab41 = ?',[sform[9]]);
        const q15 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%1%"',[faculty[10],faculty[22],subs[10]]);
        const q15_1 = connection.query('update '+selectedsection+' set lab51 = ?',[sform[10]]);
        const q17 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%1%"',[faculty[11],faculty[23],subs[11]]);
        const q17_1 = connection.query('update '+selectedsection+' set lab61 = ?',[sform[11]]);
        const q8 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%2%"',[faculty[12],faculty[24],subs[12]]);
        const q8_1 = connection.query('update '+selectedsection+' set lab12 = ?',[sform[12]]);
        const q10 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%2%"',[faculty[13],faculty[25],subs[13]]);
        const q10_1 = connection.query('update '+selectedsection+' set lab22 = ?',[sform[13]]);
        const q12 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%2%"',[faculty[14],faculty[26],subs[14]]);
        const q12_1 = connection.query('update '+selectedsection+' set lab32 = ?',[sform[14]]);
        const q14 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%2%"',[faculty[15],faculty[27],subs[15]]);
        const q14_1 = connection.query('update '+selectedsection+' set lab42 = ?',[sform[15]]);
        const q16 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%2%"',[faculty[16],faculty[28],subs[16]]);
        const q16_1 = connection.query('update '+selectedsection+' set lab52 = ?',[sform[16]]);
        const q18 = connection.query('update '+selectedsection+' set ename = ?,ename2 = ? where subject_name = ? and batch like "%2%"',[faculty[17],faculty[29],subs[17]]);
        const q18_1 = connection.query('update '+selectedsection+' set lab62 = ?',[sform[17]]);
        const [result1, result2,result3,result4,result5,result6,
               result7,result8,result9,result10,result11,result12,
               result13,result14,result15,result16,result17,result18] = await Promise.all([q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18]);
        const data = {
            result1:result1.affectedRows,
            result2:result2.affectedRows,
            result3:result3.affectedRows,
            result4:result4.affectedRows,
            result5:result5.affectedRows,
            result6:result6.affectedRows,
            result7:result7.affectedRows,
            result8:result8.affectedRows,
            result9:result9.affectedRows,
            result10:result10.affectedRows,
            result11:result11.affectedRows,
            result12:result12.affectedRows,
            result13:result13.affectedRows,
            result14:result14.affectedRows,
            result15:result15.affectedRows,
            result16:result16.affectedRows,
            result17:result17.affectedRows,
            result18:result18.affectedRows
        }
        res.json(data);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/reset',async(req,res)=>{
    const flags = req.query.flags;
    const faculty = req.query.selectedValue;
    const selectedsub = req.query.selectedsub;
    try{
        const q1 = connection.query('update '+selectedsection+' set flag = "0" where subject_name = ?',[selectedsub]);
        const q2 = connection.query('update teacher_avail set ' + flags[0] + '=0,' + flags[1] + '=0,' + flags[2] + '=0,' + flags[3] + '=0 where name=?', [faculty]);

        const [result1, result2] = await Promise.all([q1,q2]);

        const data = {
            result1:result1,
            result2:result2
        }
        res.json(data);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/labfacultyconfirm', async(req, res) => {
    const faculty = req.query.faculty;
    const flags = req.query.flags;
    try{
        const query1 = connection.query('update teacher_avail set ' + flags[0][0] + '=1 where name=? or name=?', [faculty[0],faculty[12]]);
        const query2 = connection.query('update teacher_avail set ' + flags[1][0] + '=1 where name=? or name=?', [faculty[1],faculty[13]]);
        const query3 = connection.query('update teacher_avail set ' + flags[2][0] + '=1 where name=? or name=?', [faculty[2],faculty[14]]);
        const query4 = connection.query('update teacher_avail set ' + flags[3][0] + '=1 where name=? or name=?', [faculty[3],faculty[15]]);
        const query5 = connection.query('update teacher_avail set ' + flags[4][0] + '=1 where name=? or name=?', [faculty[4],faculty[16]]);
        const query6 = connection.query('update teacher_avail set ' + flags[5][0] + '=1 where name=? or name=?', [faculty[5],faculty[17]]);
        const query7 = connection.query('update teacher_avail set ' + flags[6][0] + '=1 where name=? or name=?', [faculty[6],faculty[18]]);
        const query8 = connection.query('update teacher_avail set ' + flags[7][0] + '=1 where name=? or name=?', [faculty[7],faculty[19]]);
        const query9 = connection.query('update teacher_avail set ' + flags[8][0] + '=1 where name=? or name=?', [faculty[8],faculty[20]]);
        const query10 = connection.query('update teacher_avail set ' + flags[9][0] + '=1 where name=? or name=?', [faculty[9],faculty[21]]);
        const query11 = connection.query('update teacher_avail set ' + flags[10][0] + '=1 where name=? or name=?', [faculty[10],faculty[22]]);
        const query12 = connection.query('update teacher_avail set ' + flags[11][0] + '=1 where name=? or name=?', [faculty[11],faculty[23]]);

        const [result1, result2,result3,result4,result5,result6,result7,result8,result9,result10,result11,result12] = await Promise.all([query1, query2,query3,query4,query5,query6,query7,query8,query9,query10,query11,query12]);
        const data = {
            result1:result1.affectedRows,
            result2:result2.affectedRows,
            result3:result3.affectedRows,
            result4:result4.affectedRows,
            result5:result5.affectedRows,
            result6:result6.affectedRows,
            result7:result7.affectedRows,
            result8:result8.affectedRows,
            result9:result9.affectedRows,
            result10:result10.affectedRows,
            result11:result11.affectedRows,
            result12:result12.affectedRows
        }
        res.json(data);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/facultyconfirm', async(req, res) => {
    const faculty = req.query.faculty;
    const flags = req.query.flags;
    try{
        const query1 = connection.query('update teacher_avail set ' + flags[0][0] + '=1,' + flags[0][1] + '=1,' + flags[0][2] + '=1,' + flags[0][3] + '=1 where name=?', [faculty[0]]);
        const query2 = connection.query('update teacher_avail set ' + flags[1][0] + '=1,' + flags[1][1] + '=1,' + flags[1][2] + '=1,' + flags[1][3] + '=1 where name=?', [faculty[1]]);
        const query3 = connection.query('update teacher_avail set ' + flags[2][0] + '=1,' + flags[2][1] + '=1,' + flags[2][2] + '=1,' + flags[2][3] + '=1 where name=?', [faculty[2]]);
        const query4 = connection.query('update teacher_avail set ' + flags[3][0] + '=1,' + flags[3][1] + '=1,' + flags[3][2] + '=1,' + flags[3][3] + '=1 where name=?', [faculty[3]]);
        const query5 = connection.query('update teacher_avail set ' + flags[4][0] + '=1,' + flags[4][1] + '=1,' + flags[4][2] + '=1,' + flags[4][3] + '=1 where name=?', [faculty[4]]);
        const query6 = connection.query('update teacher_avail set ' + flags[5][0] + '=1,' + flags[5][1] + '=1,' + flags[5][2] + '=1,' + flags[5][3] + '=1 where name=?', [faculty[5]]);

        const [result1, result2,result3,result4,result5,result6] = await Promise.all([query1, query2,query3,query4,query5,query6]);
        
        const data = {
            result1:result1.affectedRows,
            result2:result2.affectedRows,
            result3:result3.affectedRows,
            result4:result4.affectedRows,
            result5:result5.affectedRows,
            result6:result6.affectedRows,
        }
        res.json(data);
    }   
    catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/login', encoder, (req, res) => {
    u = req.body.username;
    p = req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_passN = ?", [u, p], function (error, results, fields) {
        if (results.length > 0) {
            if (results[0].user_passO != results[0].user_passN && p == results[0].user_passN) {
                res.redirect('/home');
            }
            else if (results[0].user_passO != results[0].user_passN && p != results[0].user_passN) {
                res.render('index', { msg1: 'INCORRECT PASSWORD' });
            }
            else {
                res.redirect('/changepass');
            }
        }
        else {
            res.render('index', { msg1: 'INCORRECT PASSWORD OR USERNAME' });
        }
        res.end();
    });
})

app.get('/sec',(req,res)=>{
    connection.query('SELECT table_name FROM information_schema.tables WHERE table_schema = "nodejs" and table_name like "%sem%" ',(error,results)=>{
        if(error){
            console.error('Error: ',error);
            res.status(500).json({ error: 'An error occurred' });
        }
        else{
            res.json(results);
        }
    });
});

app.post('/change', encoder, (req, res) => {
    var pass1 = req.body.cnfpass1;
    var pass2 = req.body.cnfpass2;
    connection.query("select * from loginuser where user_name = ?", [u], function (error, result, fields) {
        var passkey = result[0].user_passN;
        if (pass1 == pass2 && (pass1 != passkey) && pass1.length>=8) {
            connection.query("update loginuser set user_passN = ? where user_name = ?", [pass1, u], function (error, result, fields) {
                if (result.affectedRows == 1) {
                    res.redirect('/home');
                }
            });
        }
        else {
            res.render('changepass', { msg: 'FIELDS DO NOT MATCH OR ENTER DIFFERENT PASSKEY' });
        }
    });
});

app.post('/sec_check',encoder,(req,res)=>{
    sec = req.body.section;
    if(sec===undefined){
        res.render(__dirname+"/views/eveshowtt.ejs",{p1:'BRUH, PLEASE SELECT A SECTION TO VIEW TIMETABLE'});  
    }
    else{
        connection.query('select type from '+sec+' limit 1',function(error,results){
            if(error){
                console.error('Error: ',error);
                res.status(500).json({ error: 'An error occurred' }); 
            }
            else{
                if(results[0].type==='eve'){
                    res.redirect("/home/time_table/eveshowtt");          
                }
                else if(results[0].type==='mor'){
                    res.redirect("/home/time_table/morshowtt");
                }
                else{
                    res.render(__dirname+"/views/eveshowtt.ejs",{p1:'TIME TABLE HAS NOT BEEN MADE YET'});     
                }
            }
        });
    }
});

app.get('/fetch',function(req,res){
    const sec1 = req.query.section;
    connection.query('select sub1,sub2,sub3,sub4,sub5,sub6,lab11,lab12,lab21,lab22,lab31,lab32,lab41,lab42,lab51,lab52,lab61,lab62 from '+sec1,function(error,results){
        if(error){
            console.error('Error: ',error);
            res.status(500).json({ error: 'An error occurred' }); 
        }
        else{
            res.json(results);
        }
    })
});

app.get('/tcsub', (req, res) => {
    connection.query('select subject_name,ename,ename2 from '+sec, (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
        else {
            res.json(results);
        }
    });
})

app.get('/home/time_table/eveshowtt',function(req,res){
    res.render(__dirname+"/views/eveshowtt.ejs",{p1:sec});
})

app.get('/home/time_table/morshowtt',function(req,res){
    res.render(__dirname+"/views/morshowtt.ejs",{p1:sec});
})

app.get('/home/time_table', function (req, res) {
    //res.render(__dirname + '/views/askfortt.ejs');
    res.render(__dirname + '/views/branch.ejs');
});

app.get('/home/time_table/askfortt',function(req,res){
    res.render(__dirname+'/views/askfortt.ejs');
});

app.use('/', (req, res) => {
    res.render(__dirname + "/views/404");
});

app.listen(4000);