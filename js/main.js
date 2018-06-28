var dataset = "data/Rank.csv";
var Subject = [], SchoolName = [];
var schoolLocation = [];
var schoolGlobalScores = [];
var schoolGlobalRanking = [];
var selectedSchool = []; // stack
var selectingSchool = [];
var selectedProvince = [];  // stack
var selectingProvince = [];  // stack
var minSubjectRanking=999.0,maxSubjectRanking=1, minSubjectScores=999, maxSubjectScores=0;
var minGlobalRanking=999.0,maxGlobalRanking=1, minGlobalScores=999, maxGlobalScores=0;
var colorOri = d3.scale.category20();
var colorIndex = 0;
// var selectingProvince = []; 
var province = [];
var numbers = [];

var scoresOrRanking = "s";
var subjectToShow = "GlobalRanking";
var subjectToShowOri;

var scoresOrRankingInPC = "s";



d3.csv(dataset, function(error, data) {
     if (error) throw error;
     //所有学科
     data.forEach(function(d){
          d.GlobalRanking = +d.GlobalRanking; 
          d.GlobalScores = +d.GlobalScores;
          d.SubjectRanking = +d.SubjectRanking;
          d.SubjectScores = +d.SubjectScores;

          if (d.SubjectRanking < minSubjectRanking) {  minSubjectRanking=d.SubjectRanking;};
          if (d.SubjectRanking > maxSubjectRanking) {  maxSubjectRanking=d.SubjectRanking;};
          if (d.SubjectScores < minSubjectScores) { minSubjectScores=d.SubjectScores};
          if (d.SubjectScores > maxSubjectScores) { maxSubjectScores=d.SubjectScores};

     	var b = $.inArray(d.SubjectName, Subject);
     	if(b == -1)
     		Subject.push(d.SubjectName);

     	var c = $.inArray(d.SchoolName, SchoolName);
     	if(c == -1){
               SchoolName.push(d.SchoolName);
               schoolLocation.push(d.Location);
               schoolGlobalRanking.push(d.GlobalRanking);
               schoolGlobalScores.push(d.GlobalScores)
               if (d.GlobalRanking < minGlobalRanking) {  minGlobalRanking=d.GlobalRanking;};
               if (d.GlobalRanking > maxGlobalRanking) {  maxGlobalRanking=d.GlobalRanking;};
               if (d.GlobalScores < minGlobalScores) { minGlobalScores=d.GlobalScores};
               if (d.GlobalScores > maxGlobalScores) { maxGlobalScores=d.GlobalScores};
          }
     })
     // console.log(schoolLocation);
// console.log(schoolGlobalRanking);
     // console.log(minSubjectRanking, maxSubjectRanking, minSubjectScores, maxSubjectScores);
     statisticsProvince();
     selectedSchool = SchoolName.slice(0);
     cake(data);
     subjectRanking(data);
     parallelCoordinate(data);
     // matrix(data, Subject, SchoolName);

     // radial(data);
});

function updateGraphics(){
     updateCake();
     updateParallelCoordinate();
     updateSubjectRanking();

}
Array.prototype.remove = function(val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
};  

Array.prototype.hasObj = function(val) {  
     if ($.inArray(val,this) === -1) {
          return false;
     }else{
          return true;
     }
}; 
function color(i){
     return colorOri((i+colorIndex)%21);
}
function getSchoolLocation(schoolName){
     return schoolLocation[$.inArray(schoolName,SchoolName)];
}
function statisticsProvince(){
     var t,a;
    for (var i = schoolLocation.length - 1; i >= 0; i--) {
        // a = schoolLocation[i].replace(",","\n");
        a = schoolLocation[i];
        t = $.inArray(a,province);
        if (t == -1) {
            province.push(a);
            numbers.push(1);
        }else{
            numbers[t]++;
        };
    }; 
}

