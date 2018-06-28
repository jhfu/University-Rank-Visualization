var selectingSchoolActive = 1;
function parallelCoordinate(data){
	// selectedSchool
	// var selectedSchool = ["Xi'an Jiaotong University"];

	var selectedSchoolTrue = selectedSchool.slice(0);
	// console.log(selectedSchoolTrue)

	var xData0 = ["GlobalRanking","GlobalScores"], xData1 = [] ,xData2 = [],yData = [];
	// console.log(selectedSchool)
	data.forEach(function(d){
		if (selectedSchool.hasObj(d.SchoolName)&&(!xData1.hasObj(d.SubjectName))) {
			xData1.push(d.SubjectName);
			// console.log("~~~~~~")
		};
	});
	for (var i = Subject.length - 1; i >= 0; i--) {
		if (!xData1.hasObj(Subject[i])) {
			xData2.push(Subject[i]);
		};
	};

	selectedSchool = SchoolName;
	for (var i = 0; i < selectedSchool.length; i++) {
		yData[i] = [];
	};

	// selectedSchool = selectedSchoolTrue;
	// console.log(selectedSchool)

    d3.select("#parallelCoordinate").select("svg").remove();

	var padding = {left:225, right:50, top:30, bottom:100};
        width = $("#parallelCoordinate").width() - padding.left - padding.right,
        height = $("#parallelCoordinate").height() - padding.top - padding.bottom;
        // console.log(height);

    var svg = d3.select("#parallelCoordinate").append("svg")
        .attr("width", $("#parallelCoordinate").width())
        .attr("height", $("#parallelCoordinate").height());



var yScaleName = d3.scale.ordinal()
    .domain(d3.range(SchoolName.length))
    .rangeRoundBands([0, height]);
//定义x轴
var xAxis = d3.svg.axis()
    .scale(yScaleName)
    .orient("right");
var schoolname = svg.selectAll(".labelSchoolName")
          .data(SchoolName)
          .enter().append("text")
            .text(function(d) { return d; })
            .style("text-anchor", "end")
            .style("dominant-baseline", "text-before-edge")
            .attr("class","labelSchoolName")
            .attr("transform", function(d, i){ return "translate(" + (padding.left-10) + ", "+ (padding.top+i* yScaleName.rangeBand()-3) + ")";})
            .on("mouseover",function(d){
            	if (selectingSchoolActive) {
	            	selectingSchool.push(d)
	            }
            	updateGraphics();
            	// d3.select(this).attr("fill",function(d,i){return color($.inArray(d,SchoolName))})
            	// d3.select(this).attr("fill","red")
            })
            .on("mouseout",function(d){
            	selectingSchoolActive = 1;
            	selectingSchool = [];
            	updateGraphics();
            	// d3.select(this).attr("fill","black")
            })
           .on("click",function(d){
	            if (selectedSchool.hasObj(d)) {
	                selectedSchool.remove(d)
	            }else{
	                selectedSchool.push(d)
	            }
	            selectingSchoolActive = 0;
	            selectingSchool = []; 
	            parallelCoordinate(data);
	            updateGraphics();
	        })
// console.log(1243);



svg.append("rect")
        .attr("width",90)
        .attr("height",25)
        .attr("transform","translate(" + (padding.right) + "," + (height+padding.top+padding.bottom/1.7-30) + ")")
        .attr("fill",color(3))
        .on("click",function(){
            colorIndex = Math.round(Math.random()*20);
            parallelCoordinate(data);
            cake(data);
            subjectRanking(data);
        })

svg.append("text")
    .text("change color style")
    .attr("transform","translate(" + (padding.right+5) + "," + (height+padding.top+padding.bottom/1.7+16-30) + ")")
    .on("click",function(){
            colorIndex = Math.round(Math.random()*20);
            parallelCoordinate(data);
            cake(data);
            subjectRanking(data);
            updateGraphics();
        })


/***************************/

svg.append("rect")
        .attr("width",90)
        .attr("height",25)
        .attr("transform","translate(" + (padding.right) + "," + (height+padding.top+padding.bottom/1.7) + ")")
        .attr("fill",function(){
            if (scoresOrRankingInPC == "r") {return "pink"}
            else if (scoresOrRankingInPC == "s") {return "skyblue"};
        })
        .on("click",function(){
            if (scoresOrRankingInPC == "r") {
                scoresOrRankingInPC = "s";
            }else{
                scoresOrRankingInPC = "r";
            }
            parallelCoordinate(data);
            console.log(Math.round(Math.random()*20))
        })

svg.append("text")
    .text("Scores / Ranking")
    .attr("transform","translate(" + (padding.right+5) + "," + (height+padding.top+padding.bottom/1.7+16) + ")")
    .on("click",function(){
	            if (scoresOrRankingInPC == "r") {
	                scoresOrRankingInPC = "s";
	            }else{
	                scoresOrRankingInPC = "r";
	            }
	            parallelCoordinate(data);
	        })
svg.append("text")
    .text(function(){
        if (scoresOrRankingInPC == "s") {
            return "(scores)";
        }else if(scoresOrRankingInPC == "r"){
            return "(ranking)";
        }
    })
    .attr("transform", "translate("+(width+padding.left-2)+","+(padding.top/2+25)+")" )
            


    xScale0Length = 160;   
    lamda = xData2.length/(xData1.length*2+xData2.length);
	xScale2Length = (width - xScale0Length) * lamda;
	xScale1Length = (width - xScale0Length) * ( 1 - lamda );
// console.log(xScale1Length,xScale2Length)

//x轴的比例尺
var xScale0 = d3.scale.ordinal()
    .domain(d3.range(2))
    .rangeRoundBands([0, xScale0Length]);
var xAxis = d3.svg.axis()
    .scale(xScale0)
    .orient("bottom");
svg.append("g")
  .attr("class","sc axis")
  .attr("transform","translate(" + padding.left + "," + (height+padding.top) + ")")
  .call(xAxis);  
var xScale1 = d3.scale.ordinal()
    .domain(d3.range(xData1.length))
    .rangeRoundBands([0, xScale1Length]);
var xAxis = d3.svg.axis()
    .scale(xScale1)
    .orient("bottom");
svg.append("g")
  .attr("class","sc axis")
  .attr("transform","translate(" + (padding.left+xScale0Length) + "," + (height+padding.top) + ")")
  .call(xAxis); 
var xScale2 = d3.scale.ordinal()
    .domain(d3.range(xData2.length))
    .rangeRoundBands([0, xScale2Length]);
//定义x轴
var xAxis = d3.svg.axis()
    .scale(xScale2)
    .orient("bottom");
//添加x轴
svg.append("g")
  .attr("class","sc axis")
  .attr("transform","translate(" + (padding.left+xScale0Length+xScale1Length) + "," + (height+padding.top) + ")")
  .call(xAxis); 

function xScale(index,half){
	var temp = 0;
	if (index < 1) {
		return padding.left;
	}else if (index < 3) {
		if (half) { temp = xScale0.rangeBand()/2};
		return xScale0(index-1)+padding.left + temp;
	}else if (index < xData1.length+3) {
		if (half) { temp = xScale1.rangeBand()/2};
		return xScale1(index-3)+padding.left + xScale0Length +temp;
	}else{
		if (half) { temp = xScale2.rangeBand()/2};
		return xScale2(index-xData1.length-3)+padding.left+xScale1Length+xScale0Length + temp;
	}
}
var xData00 = ["School Name"];
xData = xData00.concat(xData0.concat(xData1.concat(xData2)));
var schoolname = svg.selectAll(".labelSubjectName")
          .data(xData)
          .enter().append("text")
            .text(function(d) { return d; })
            .style("text-anchor", "start")
            .style("dominant-baseline", "text-before-edge")
            .attr("transform", function(d, i){ 
            	return "translate(" + xScale(i,1) + ", "+ (padding.top+height+8) + "), rotate(35)";})
            .attr("class", "labelSubjectName")
     //        .on("mouseover",function(d,i){
     //        	if (i>=3) {
     //        		subjectToShowOri = subjectToShow;
     //        		subjectToShow = d;
					// subjectRanking(data)
     //        	};
     //        })
     //        .on("mouseout",function(){
     //        	if (i>=3) {
     //        		// subjectToShowOri = subjectToShow;
     //        		subjectToShow = subjectToShowOri;
					// subjectRanking(data)
     //        	};
     //        })
            .on("click",function(d,i){
            	if (i>=1) {
            		subjectToShow = d;
					subjectRanking(data)
            	};
            })

// y轴的比例尺

var yScaleDetails= d3.scale.linear()
if (scoresOrRankingInPC == "s") {
	var temp = (maxSubjectScores - minSubjectScores) * 0.1;
    yScaleDetails.domain([minSubjectScores-temp,maxSubjectScores+temp])
	    .range([height,0]);  
}else{
	var temp = (maxSubjectRanking - minSubjectRanking) * 0.1;
    yScaleDetails.domain([minSubjectRanking-temp,maxSubjectRanking+temp])
	    .range([0,height]); 
}   
var yAxis = d3.svg.axis()
    .scale(yScaleDetails)
    .orient("left");
for (var i = xData.length - 1; i >= 3; i--) {
	svg.append("g")
	  .attr("class","pa axis")
	  .attr("transform","translate(" + xScale(i,1) + "," + padding.top + ")")
	  .call(yAxis)
};

var temp = (maxGlobalScores - minGlobalScores) * 0.1;
var yScaleGlobalScores = d3.scale.linear()
    .domain([minGlobalScores-temp,maxGlobalScores+temp])
    .range([height,0]);    
var yAxisGlobalScores = d3.svg.axis()
    .scale(yScaleGlobalScores)
    .orient("left");
svg.append("g")
	  .attr("class","axis")
	  .attr("transform","translate(" + xScale(2,1) + "," + padding.top + ")")
	  .call(yAxisGlobalScores);
var temp = (maxGlobalRanking - minGlobalRanking) * 0.1;
var yScaleGlobalRanking = d3.scale.linear()
    .domain([minGlobalRanking-temp,maxGlobalRanking+temp])
    .range([0,height]);    
var yAxisGlobalRanking = d3.svg.axis()
    .scale(yScaleGlobalRanking)
    .orient("left");
svg.append("g")
	  .attr("class","axis")
	  .attr("transform","translate(" + xScale(1,1) + "," + padding.top + ")")
	  .call(yAxisGlobalRanking);
function yScale(value,type){
	// var temp = 0;
	if (type == 0){
		return yScaleName(value)+padding.top;
	}else if (type == 1){
		return yScaleGlobalRanking(value)+padding.top;
	}else if (type == 2) {
		return yScaleGlobalScores(value)+padding.top;
	}else{
		return yScaleDetails(value)+padding.top;
	}
}

  // svg.append("g")
  // .attr("class","axis")
  // .attr("transform","translate(" + (100+padding.left) + "," + padding.top + ")")
  // .call(yAxis);

selectedSchool = SchoolName;


var temp;
if (scoresOrRankingInPC == "s") {
	data.forEach(function(d){
		temp = $.inArray(d.SchoolName,selectedSchool);
		yData[temp][$.inArray(d.SubjectName,xData)]=d.SubjectScores;
		yData[temp][0] = temp;
		yData[temp][1] = d.GlobalRanking;
		yData[temp][2] = d.GlobalScores;
	});
}else if (scoresOrRankingInPC == "r") {
	data.forEach(function(d){
		temp = $.inArray(d.SchoolName,selectedSchool);
		yData[temp][$.inArray(d.SubjectName,xData)]=d.SubjectRanking;
		yData[temp][0] = temp;
		yData[temp][1] = d.GlobalRanking;
		yData[temp][2] = d.GlobalScores;
	});
};

// console.log(yData);

var yDataComp = [];
var yDataIndex =[];
for (var i = 0; i < selectedSchool.length; i++) {
	yDataComp[i] = [];
	yDataIndex[i] = []; 
	for (var j = 0; j < yData[i].length; j++) {
		if (yData[i][j] != null) {
			var t = new Object;
			t.value = yData[i][j];
			t.index = j;
			t.schoolName = selectedSchool[i];
			// console.log(t)
			yDataComp[i].push(t);
			yDataIndex[i].push(j);
		};
	};
}

// console.log(yDataComp);



for (var i = 0; i < selectedSchool.length; i++) {
	// var schoolColor = color($.inArray(selectedSchool[i],SchoolName));
	// console.log("draw:",selectedSchool[i],i);
	var schoolColor = color(i);
	var opacity = 0.15, radius = 4 ;
	if (selectedSchoolTrue.hasObj(selectedSchool[i])) {
		opacity = 1;
		radius = 6;
	};
	if (selectingSchool.hasObj(selectedSchool[i])) {
		opacity = 1;
		radius = 7;
		schoolColor = "yellow";
	};
	// console.log(selectedSchool[i],$.inArray(selectedSchool[i],SchoolName));

		// var label = ".dot"+selectedSchool[i];
		// console.log(yDataComp[i])
	svg.selectAll(".dot")
		.data(yDataComp[i])
	    .enter().append("circle")
		.attr("r", radius)
		.attr("cx", function(d) { return xScale(d.index,1); })
		.attr("cy", function(d) {  return yScale(d.value,d.index); })
		.style("fill", schoolColor)
		.style("fill-opacity", opacity)
		.text(i)
		.on("click",function(d,j){
			if (j>=1) {
				// console.log(i,j,d)
				subjectToShow = xData[d.index];
				subjectRanking(data)
			};
			if (selectedSchool.hasObj(SchoolName[d3.select(this)[0][0].textContent])) {
				selectedSchool.remove(SchoolName[d3.select(this)[0][0].textContent])
			}else{
				selectedSchool.push(SchoolName[d3.select(this)[0][0].textContent])
			}
			selectingSchoolActive = 0;
			selectingSchool = []; 
			parallelCoordinate(data)
			updateGraphics();
		})
		.on("mouseover",function(){
			selectingSchool = [];
			if(selectingSchoolActive){
				selectingSchool.push(SchoolName[d3.select(this)[0][0].textContent])
			}
			// console.log("right:",)
			updateGraphics();
		})
		.on("mouseout",function(){
			selectingSchoolActive = 1;
			selectingSchool = [];
			updateGraphics();
		})

var line = d3.svg.line()
	    .x(function(d,j) {
	      return xScale(yDataIndex[i][j],1)
	    })
	    .y(function(d,i) {
	      return yScale(d.value,i);
	    })
	    .interpolate('monotone')
	    // .schoolName("~~~");

svg.append('path')
		.attr('d', line(yDataComp[i]))
		.attr("class",selectedSchool[i])
		.style("fill","none")
		.style("stroke-width",2)
		.style("stroke",schoolColor)
		.style("stroke-opacity",opacity)
		.text(i)
		.on("click",function(d,j){
			if (selectedSchool.hasObj(SchoolName[d3.select(this)[0][0].textContent])) {
				selectedSchool.remove(SchoolName[d3.select(this)[0][0].textContent])
			}else{
				selectedSchool.push(SchoolName[d3.select(this)[0][0].textContent])
			}
			selectingSchoolActive = 0;
			selectingSchool = []; 
			parallelCoordinate(data)
			updateGraphics();
		})
		.on("mouseover",function(){
			selectingSchool = [];
			if (selectingSchoolActive) {
				selectingSchool.push(SchoolName[d3.select(this)[0][0].textContent])
			}
			// console.log("right:",)
			updateGraphics();
		})
		.on("mouseout",function(){
			selectingSchoolActive = 1;
			selectingSchool = [];
			updateGraphics();
		})
};

	selectedSchool = selectedSchoolTrue;
}

function updateParallelCoordinate(){
	// console.log("updateParallelCoordinateTest");
	d3.select("#parallelCoordinate").selectAll("circle")
		.style("fill-opacity",function(d,i){
			// console.log(this.textContent,d.schoolName)
			if (selectingSchool.length == SchoolName.length) {
				return 1;
			}else{
				if (selectingSchool.hasObj(d.schoolName)) {
					return 1;
				}else if(selectedSchool.hasObj(d.schoolName)){
					if(selectingSchool.length==0){
						return 1;
					}else{
						return 0.8;
					}
				}else{
					return 0.2;
				}
			}
		})
		.style("fill",function(d,i){
			if (selectingSchool.length == SchoolName.length) {
				return color(+this.textContent);
			}else{
						// console.log("update:",this.textContent,d.schoolName,color(this.textContent));
				if (selectingSchool.hasObj(d.schoolName)) {
					return "yellow";
				}else {
					return color(+this.textContent);
				}
			}
		})
		.attr("r",function(d){
			if (selectingSchool.length == SchoolName.length) {
				return 7;
			}else{
				if (selectingSchool.hasObj(d.schoolName)) {
					return 7;
				}else if(selectedSchool.hasObj(d.schoolName)){
					return 6;
				}else{
					return 3;
				}
			}
		})

	d3.select("#parallelCoordinate").selectAll("path")
		.style("stroke-opacity",function(){
			// console.log(this.textContent,d.schoolName)
			if (selectingSchool.length == SchoolName.length) {
				return 1;
			}else{
				if(this.textContent!=""){
					if (selectingSchool.hasObj(SchoolName[+this.textContent])) {
						return 1;
					}else if(selectedSchool.hasObj(SchoolName[+this.textContent])){
						if(selectingSchool.length==0){
							return 1;
						}else{
							return 0.7;
						}
					}else{
						return 0.2;
					}
				}else{
					return 1
				}
			}
		})
		.style("stroke",function(){
			if (selectingSchool.length == SchoolName.length) {
				return color(+this.textContent);
			}else{
				if (this.textContent!="") {
					if (selectingSchool.hasObj(SchoolName[+this.textContent])) {
						return "yellow";
					}else {
						return color(+this.textContent);
					}
				}else{
					return "black"
				}
			}
		})
	d3.select("#parallelCoordinate").selectAll(".labelSchoolName")
		.attr("fill",function(d){
			if (selectingSchool.length == SchoolName.length) {
				return "black";
			}else{
				if (selectingSchool.hasObj(d)) {
					return "red";
				}else if(selectedSchool.hasObj(d)){
					return "black"
				}else{
					return "gray";
				}
			}



			if (selectingSchool.hasObj(d)) {
				return "red"
			}else{
				return "black"
			}
		})
		
}

