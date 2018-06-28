

function subjectRanking(data){
    subject = subjectToShow

    // var t=d3.selectAll("#axis");
    // console.log(t);
    // d3.selectAll("axis").remove();
    d3.select("#subjectRanking").select("svg").remove();

	var padding = {left:40, right:50, top:20, bottom:100};
        width = $("#subjectRanking").width() - padding.left - padding.right,
        height = $("#subjectRanking").height() - padding.top - padding.bottom;
        // console.log(height);

    var svg = d3.select("#subjectRanking").append("svg")
        .attr("width", $("#subjectRanking").width())
        .attr("height", $("#subjectRanking").height());

// console.log(subject);

var minY=9999,maxY=0;
var yData = [], xData = [];

    // console.log(xData);
    // console.log(yData); 


if (subject == "GlobalRanking"){
    yData = []; xData = [];
    for (var i = 0; i < SchoolName.length; i++) {
        xData.push(SchoolName[i])
        var t = {};
        t.schoolName = SchoolName[i]
        t.value = schoolGlobalRanking[i]
        yData.push(t)
    };
    minY = minGlobalRanking;
    maxY = maxGlobalRanking;
    scoresOrRanking = "r";
}else if(subject == "GlobalScores") {
    yData = []; xData = [];
    for (var i = 0; i < SchoolName.length; i++) {
        xData.push(SchoolName[i])
        var t = {};
        t.schoolName = SchoolName[i]
        t.value = schoolGlobalScores[i]
        yData.push(t)
    };
    minY = minGlobalScores;
    maxY = maxGlobalScores;
    scoresOrRanking = "s";
}else{
    data.forEach(function(d){
        if (d.SubjectName == subject){
            xData.push(d.SchoolName);
            var t = {};
            t.schoolName = d.SchoolName;
            if (scoresOrRanking == "s"){
                t.value = d.SubjectScores
            }else if (scoresOrRanking == "r"){
                t.value = d.SubjectRanking
            }
            if (t.value<minY) {minY=t.value};
            if (t.value>maxY) {maxY=t.value};
            yData.push(t)
        }
     })
}



//定义一个数组
var dataset = yData;

//x轴的比例尺
var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, width]);
//定义x轴
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
//添加x轴
svg.append("g")
  .attr("class","sc axis")
  .attr("transform","translate(" + padding.left + "," + (height+padding.top) + ")")
  .call(xAxis); 
        


//y轴的比例尺
var yScale = d3.scale.linear();
    // .domain([0,d3.max(dataset)]);
    // console.log(minY,maxY);
if (scoresOrRanking=="s") {
    var temp = (maxY - minY)/5;
    if (maxY+temp>100) {
        yScale.domain([minY-temp,100])
            .range([height,0]); 
    }else{
        yScale.domain([minY-temp,maxY+temp])
            .range([height,0]); 
    }
}else if (scoresOrRanking=="r") {
    var temp = (maxY - minY)/5;
    yScale.domain([minY-temp/2,maxY+temp])
        .range([0,height]); 
}
      
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(" + padding.left + "," + padding.top + ")")
  .call(yAxis);
// 添加y轴
svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(" + padding.left + "," + padding.top + ")")
  .call(yAxis);



var schoolname = svg.selectAll(".schoolname")
          .data(xData)
          .enter().append("text")
            .text(function(d) { return d; })
            .style("text-anchor", "start")
            .style("dominant-baseline", "text-before-edge")
            .attr("transform", function(d, i){ return "translate(" + (padding.left +(i+0.5)* xScale.rangeBand()) + ", "+ (padding.top+height+8) + "), rotate(35)";})
            .attr("class", "schoolname");


svg.selectAll(".SubjectName")
          .data(subject)
          .enter().append("text")
            .text(function(){
                if (subject == "GlobalScores" || subject =="GlobalRanking") {
                    return subject;
                }else{
                    if (scoresOrRanking == "s") {
                        return subject+"(scores)";
                    }else if(scoresOrRanking == "r"){
                        return subject+"(ranking)";
                    }
                }
            })
            .attr("transform", "translate("+(width/2)+","+(padding.top/2+5)+")" )


svg.append("rect")
        .attr("width",90)
        .attr("height",25)
        .attr("transform","translate(" + (padding.left/3) + "," + (height+padding.top+padding.bottom/1.7) + ")")
        .attr("fill",function(){
            if (scoresOrRanking == "r") {return "pink"}
            else if (scoresOrRanking == "s") {return "skyblue"};
        })
        .on("click",function(){
            if (scoresOrRanking == "r") {
                scoresOrRanking = "s";
            }else{
                scoresOrRanking = "r";
            }
            subjectRanking(data)
        })
svg.append("text")
            .text("Scores / Ranking")
            .attr("transform","translate(" + (padding.left/3+5) + "," + (height+padding.top+padding.bottom/1.7+16) + ")")
            .on("click",function(){
                if (scoresOrRanking == "r") {
                    scoresOrRanking = "s";
                }else{
                    scoresOrRanking = "r";
                }
                subjectRanking(data)
            })


// svg.append("rect")
//         .attr("width",50)
//         .attr("height",25)
//         .attr("transform","translate(" + (padding.left/3+50) + "," + (height+padding.top+padding.bottom/1.7) + ")")
//         .attr("fill","pink")
//         .on("click",function(){
//             if (scoresOrRanking=="r") {
//                 scoresOrRanking = "s";
//                 d3.select(this).attr("fill","gray")

//             }else{
//                 scoresOrRanking ="r";
//                 d3.select(this).attr("fill","pink");
//             }
//             console.log(scoresOrRanking)
//         })





//矩形之间的空白
var rectPadding = width*0.15/dataset.length;

//添加矩形元


var rects = svg.selectAll(".MyRect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","MyRect")   //把类里的 fill 属性清空
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i) + rectPadding/2;
        } )
        .attr("y",function(d){
            return yScale(d.value);
        })
        .attr("width", xScale.rangeBand() - rectPadding )
        .attr("height", function(d){
            return height - yScale(d.value);
        })
        .attr("fill",function(d,i){
            return color($.inArray(xData[i],SchoolName))
        })       //填充颜色不要写在CSS里
        .on("mouseover",function(d,i){
            selectingSchool.push(xData[i]);
            updateGraphics();
        })
        .on("mouseout",function(d,i){
            selectingSchool = [];
            updateGraphics();
        })
        .on("click",function(d,i){
            if (selectedSchool.hasObj(xData[i])) {
                selectedSchool.remove(xData[i])
            }else{
                selectedSchool.push(xData[i])
            }
            selectingSchool = []; 
            parallelCoordinate(data);
            updateGraphics();
        })

        .attr("y",function(d){
            var min = yScale.domain()[0];
            return yScale(min);
        })
        .attr("height", 0)
        .transition()
        .delay(function(d,i){
            return i * 25;
        })
        .duration(500)
        .ease("linear")
        .attr("y",function(d){
            return yScale(d.value);
        })
        .attr("height", function(d){
            return height - yScale(d.value);
        })


//添加文字元素
var texts = svg.selectAll(".MyText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","MyText")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i) + rectPadding/2;
        } )
        .attr("y",function(d){
            return yScale(d.value);
        })
        .attr("dx",function(){
            return (xScale.rangeBand() - rectPadding)/2-8;
        })
        .attr("dy",function(d){
            return -2;
        })
        .text(function(d){
            return d.value;
        })

        .attr("y",function(d){
            var min = yScale.domain()[0];
            return yScale(min);
        })
        .transition()
        .delay(function(d,i){
            return i * 40;
        })
        .duration(1000)
        .ease("bounce")
        .attr("y",function(d){
            return yScale(d.value);
        });

}


function updateSubjectRanking(){
    d3.select("#subjectRanking").selectAll("rect")
        .attr("fill",function(d,i){
            // console.log(d)
            if(d!=null){
                if (selectingSchool.length == SchoolName.length) {
                    return  color($.inArray(d.schoolName,SchoolName));
                }else{
                    if (selectingSchool.hasObj(d.schoolName)) {
                        return "yellow";
                    }
                    else{
                        return color($.inArray(d.schoolName,SchoolName));
                    }
                }
            }else{
                 if (scoresOrRanking == "r") {return "pink"}
                else if (scoresOrRanking == "s") {return "skyblue"};
            }
        })
        .attr("fill-opacity",function(d,i){
            // console.log(d)
            if(d!=null){
                if (selectingSchool.length == SchoolName.length) {
                    return 1;
                }else{
                    if (selectingSchool.length==0) {
                        if (selectedSchool.hasObj(d.schoolName)) {
                            return 1;
                        }else{
                            return 0.2;
                        }
                    }else{
                        if (selectingSchool.hasObj(d.schoolName)) {
                            return 1;
                        }else if (selectedSchool.hasObj(d.schoolName)) {
                            return 1;
                        }else{
                            return 0.2;
                        }
                    }
                }
            }else{
                 if (scoresOrRanking == "r") {return "pink"}
                else if (scoresOrRanking == "s") {return "skyblue"};
            }
        })

}