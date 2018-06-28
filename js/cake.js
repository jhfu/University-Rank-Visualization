


function cake(data){



	// console.log(schoolLocation);

	// console.log(province);


	var margin = {top: 0, right: 0, bottom: 0, left: 0},
    	width = $("#cake").width() - margin.left - margin.right,
    	height = $("#cake").height() - margin.top - margin.bottom;

	d3.select("#cake").select("svg").remove();
	var svg = d3.select("#cake").append("svg")
	    .attr("width", $("#cake").width())
	    .attr("height", $("#cake").height());

    svg.append("text")
    .text("School Location")
    .attr("transform","translate(" + (width/13) + "," + (height-16) + ")")

	var dataset = numbers;
	

	var pie = d3.layout.pie();
	var piedata = pie(dataset);
	
	var outerRadius = height * 0.45;	//外半径
	var innerRadius = outerRadius * 0.45;	//内半径，为0则中间没有空白

	var arc = d3.svg.arc()	//弧生成器
				.innerRadius(innerRadius)	//设置内半径
				.outerRadius(outerRadius);	//设置外半径
	
	// var color = d3.scale.category20();
	
	var arcs = svg.selectAll("g")
				  .data(piedata)
				  .enter()
				  .append("g")
				  .attr("transform","translate("+ (width/2) +","+ (height/2) +")");
				  
	arcs.append("path")
		.attr("fill",function(d,i){
			return color(i);
		})
		.attr("d",function(d){
			return arc(d);
		})
		.on("mouseover",function(d,i){
			for (var j = schoolLocation.length - 1; j >= 0; j--) {
				if (schoolLocation[j] == province[i]){
					selectingSchool.push(SchoolName[j])
				}
			};
        	// d3.select(this).attr("fill","yellow");
        	updateGraphics();
    	})
    	.on("mouseout",function(d,i){
    		selectingSchool = [];
        	// d3.select(this).transition().duration(500).attr("fill",color(i))
            updateGraphics();
    	})
    	.on("click",function(d,i){
    		// console.log(d.data, province[i]);
    		var b = $.inArray(province[i],selectedProvince)
    		if (b == -1) {
    			selectedProvince.push(province[i]);
    			for (var j = schoolLocation.length - 1; j >= 0; j--) {
					if (schoolLocation[j] == province[i]){
						selectedSchool.push(SchoolName[j]);
					}
				};
    		}else{
    			selectedProvince.remove(province[i]);
    			for (var j = schoolLocation.length - 1; j >= 0; j--) {
					if (schoolLocation[j] == province[i]){
						selectedSchool.remove(SchoolName[j]);
					}
				};
    		}
            selectingSchool = []; 
    		parallelCoordinate(data);
            updateGraphics();
    		return ;
    	});
	arcs.append("text")
		.attr("transform",function(d){
			return "translate(" + arc.centroid(d) + ")";
		})
		.attr("text-anchor","middle")
		.text(function(d,i){
			return province[i]+": "+d.data;
		})
		.on("mouseover",function(d,i){
			for (var j = schoolLocation.length - 1; j >= 0; j--) {
				if (schoolLocation[j] == province[i]){
					selectingSchool.push(SchoolName[j])
				}
			};
        	updateGraphics();
    	})
    	.on("mouseout",function(d,i){
    		selectingSchool = [];
        	updateGraphics();
    	})
		.on("click",function(d,i){
    		// console.log(d.data, province[i]);
    		var b = $.inArray(province[i],selectedProvince)
    		if (b == -1) {
    			selectedProvince.push(province[i]);
    			for (var j = schoolLocation.length - 1; j >= 0; j--) {
					if (schoolLocation[j] == province[i]){
						selectedSchool.push(SchoolName[j]);
					}
				};
    		}else{
    			selectedProvince.remove(province[i]);
    			for (var j = schoolLocation.length - 1; j >= 0; j--) {
					if (schoolLocation[j] == province[i]){
						selectedSchool.remove(SchoolName[j]);
					}
				};
    		}
            selectingSchool = []; 
    		parallelCoordinate(data);
            updateGraphics();
    		return ;
    	});

	var center = svg.append("circle")
        .attr("cx", width/2)
        .attr("cy", height/2)
        .attr("r", innerRadius)
        .style("fill",color(province.length+1))
        .on("mouseover",function(){
        	d3.select(this).style("fill","yellow").style("fill-opacity",1);
        	// for (var i = SchoolName.length - 1; i >= 0; i--) {	selectingSchool[i]=1;};
    		selectingSchool = SchoolName.slice(0);
	    	updateGraphics();
    	})
    	.on("mouseout",function(d,i){
        	d3.select(this).transition().duration(300).style("fill",color(province.length+1))
                .style("fill-opacity",function(){
                    if (selectedSchool.length == 0) {
                        return 0.2;
                    }else{
                        return 1;
                    }
                })
            selectingSchool = []; 
            updateGraphics();
    	})
    	.on("click",function(d,i){
    		// console.log("All: "+d3.sum(numbers));
    		if(selectedSchool.length == SchoolName.length){
    			selectedProvince = [];
    			selectedSchool = [];
                d3.select(this).style("fill",color(province.length+1))
                    .style("fill-opacity",0.2);

    		}else{
    			selectedSchool = [];
    			for (var i = SchoolName.length - 1; i >= 0; i--) {selectedSchool.push(SchoolName[i]);};
    			selectedProvince = [];
    			for (var i = province.length - 1; i >= 0; i--) { selectedProvince.push(province[i]); };
                d3.select(this).style("fill",color(province.length+1))
                    .style("fill-opacity",1);
    		}
    		selectingSchool = []; 
            updateGraphics();
    	});
    svg.append("text")
    	.attr("transform","translate("+ (width/2) +","+ (height/2) +")")
    	.attr("text-anchor","middle")
    	.text("All: "+d3.sum(numbers))
    	.on("mouseover",function(){
        	// d3.select(this).style("fill","yellow");
        	// for (var i = SchoolName.length - 1; i >= 0; i--) {	selectingSchool[i]=1;};
    		selectingSchool = SchoolName.slice(0);
	    	updateGraphics();
    	})
    	.on("mouseout",function(d,i){
        	// d3.select(this)
         //    .transition()
         //    .duration(500)
         //    .style("fill",color(province.length+1));
            selectingSchool = []; 
        	updateGraphics();
    	})
    	.on("click",function(d,i){
    		// console.log("All: "+d3.sum(numbers));
    		if(selectedSchool.length == SchoolName.length){
    			selectedProvince = [];
    			selectedSchool = [];
    		}else{
    			selectedSchool = [];
    			for (var i = SchoolName.length - 1; i >= 0; i--) {selectedSchool.push(SchoolName[i]);};
    			selectedProvince = [];
    			for (var i = province.length - 1; i >= 0; i--) { selectedProvince.push(province[i]); };
    		}
    		selectingSchool = []; 
    		parallelCoordinate(data);
    		updateGraphics();
    		return ;
    	});

}
// function updateParallelCoordinate(){
// 	// subjectRanking(data,subject,"scores");
// 	parallelCoordinate(,1);
// }

function updateSelectProvince(){
     selectedProvince = [];
     selectingProvince = [];
     var provinceTemp;
     // console.log("bf ",selectingSchool,selectingProvince);
     for (var i = 0; i < selectedSchool.length; i++) {
          provinceTemp = getSchoolLocation(selectedSchool[i])
          if (!selectedProvince.hasObj(provinceTemp)) {
          selectedProvince.push(provinceTemp)
          }
     };
     for (var i = 0; i < selectingSchool.length; i++) {
          provinceTemp = getSchoolLocation(selectingSchool[i])
          if (!selectingProvince.hasObj(provinceTemp)) {
          selectingProvince.push(provinceTemp)
          }
     };
     // console.log("af ",selectingSchool,selectingProvince);
}
function updateCake(){
    updateSelectProvince();
    if (selectingProvince.length == 0) {
        d3.select("#cake").selectAll("g").attr("fill-opacity",function(d,i){
            if ($.inArray(province[i],selectedProvince) == -1) {
                return 0.2;
            }else{
                return 1;
            };
        });
        d3.select("#cake").selectAll("path").attr("fill",function(d,i){
            return color(i);
        });

        // d3.select("#cake").selectAll("circle").attr("fill",color(province.length+1));
        // d3.select("#cake").selectAll("circle").attr("fill-opacity",);

    }else if (selectingProvince.length == province.length) {
        d3.select("#cake").selectAll("g").attr("fill-opacity",1);
        d3.select("#cake").selectAll("path").attr("fill",function(d,i){
            return color(i);
        });
    }else{
        d3.select("#cake").selectAll("g").attr("fill-opacity",function(d,i){
            if (selectingProvince.hasObj(province[i])) {
                return 1;
            }else if(selectedProvince.hasObj(province[i])){
                return 1;
            }else{
                return 0.2;
            }
            // if ($.inArray(province[i],selectingProvince) == -1) {
            //     return 0.2;
            // }else{
            //     return 1;
            // };
        });
        d3.select("#cake").selectAll("path")
            // .transition()
            // .duration(function(d,i){
            //     if (selectingProvince.hasObj(province[i])) {
            //         return 0
            //     }else{
            //         // console.log()
            //         return 5000
            //     }
            // })
            .attr("fill",function(d,i){
                if (selectingProvince.hasObj(province[i])) {
                    return "yellow";
                }else{
                    // console.log()
                    return color(i);
                }
            })
    }

}
// function provinceToSchool(province){
// 	var result = [];
// 	for (var i = province.length - 1; i >= 0; i--) {
// 		for (var j = schoolLocation.length - 1; j >= 0; j--) {
// 			result.push(j);
// 		};
// 	};
// 	return result;
// }

// // 