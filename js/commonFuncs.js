/**
 * Created by cckk on 2015/6/28.
 */

function writeFile(filename,filecontent){
    var fso, f, s ;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    f = fso.OpenTextFile(filename,8,true);
    f.WriteLine(filecontent);
    f.Close();
    alert('ok');
}