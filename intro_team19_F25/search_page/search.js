var data = [];
var jsonFiles = ['../pet_data/info.json'];

$(document).ready(async function() {
	// jsonFiles.forEach( async function(file) {
		// data += await fetchJson(file);
	// });
	for(let i = 0; i < jsonFiles.length; i++) {
		data = data.concat( await fetchJSON(jsonFiles[i]) );
	}
	// generateSearchForm(data);
	if(document.getElementById("tag-group")) {
		generateTags(data);
	}
	generatePets(data);
});



function generateTags(data) {
	var tags = {};
	data.forEach( pet => {
		pet.tags.forEach(tag => {
			tags[tag] = (tags[tag] || 0) + 1;
		});
	});
	tags = Object.entries(tags).sort((a,b) => b[1]-a[1] );
	tags = tags.sort((a,b) => b[1]-a[1] );
	let tagGroup = document.getElementById("tag-group");
	// tagGroup.innerHTML += `
		// <div class="form-group">
	// `;
	urlParams = new URLSearchParams(window.location.search);
	for (let i = 0; i < tags.length && i < 8; i++) {
	  tagName = tags[i][0];
	  isChecked = urlParams.has(tagName) && urlParams.get(tagName) === '1';
	  if(isChecked) checked = "checked";
	  else checked = "";
	  console.log("checked = "+checked);
	  tagGroup.innerHTML += `
	    <div class="inline-checkbox">
	      <input type="checkbox" id="${tagName}" name="${tagName}" value="1" ${checked}>
	      <label for="${tagName}">${tagName}</label>
	    </div>
	  `;
	}
	// tagGroup.innerHTML += `
		// </div>
	// `;

}



function generatePets(data) {
	console.log("GP.data = " + data);
	let searchVals = new URLSearchParams(window.location.search);
	if(searchVals) {
		console.log("Search Vals:"+searchVals);
		for([key, value] of searchVals) {
			if(value == "") searchVals.delete(key);
			console.log(key+" :: "+value);
		}
	} else {
		console.log("No search vals");
	}
	if(searchVals.get("sort-type")) {
		console.log("sorting by: "+searchVals.get("sort-type"));
		data = petSort(data, searchVals.get("sort-type"), searchVals.get("sort-direction"));
	} else {
		console.log("No sort-type, skipping sorting");
	}
	
	// remove sorting info from searchVals
	// search vals is now just filtering information
	searchVals.delete("sort-type");
	searchVals.delete("sort-direction");

	
	petGrid = document.getElementById('pet-grid');
	console.log("add "+data.length+" blocks");
	let numResults = 0;
	let search = false;
	for(var i = 0; i < data.length; i++) {
		console.log(data[i].tags);
		let valid = true;
		let hasATag = false;
		var tagVals = [];
		// note: at this point sorting info has been removed from searchVals
		for([key, value] of searchVals) {
			if(key == "" || value == "") {
				continue;
			} else {
				console.log("filtering by "+key);
				search = true;
			}
			console.log("For key "+key);
			if(key == "age") {
				// the age filter requires special parsing
				petAge = petAgeToNum(data[i]);
				if(value.indexOf("+") != -1) {
					if(petAge < 15) {
						valid = false;
						break;
					}
				} else {
					ageRange = value.split("-");
					// console.log("age range = "+ageRange[0]+"-"+ageRange[1]);
					if(petAge < ageRange[0] || petAge > ageRange[1]) {
						valid = false;
						break;
					}
				}
				
			} else if(value === '1') { 
				// collect tags for later
				tagVals.push([key, value]);
			} else if(data[i][key] && data[i][key] != value) {
				valid = false;
				break;
			}
		}
		// check for tags
		if(valid && tagVals.length > 0) {
			valid = false;
			for([key, value] of tagVals) {
				if(key == "all") {
					valid = true;
					break;
				}
				if(value == '1') {
					if (data[i].tags.includes(key)) {
						valid = true;
					    break;
					}
				}
			}
		}
		

		if(!valid) {
			console.log(data[i][key] + " is invalid");
			continue;
		}
		numResults++;

		let petImage = data[i].image;
		if(petImage.includes("placehold")) {
			petImage = generateImage(data[i]);
		}
		petGrid.innerHTML += `
		<article class='pet-card'> 
			<div class='pet-card-image'>
		    	<img src='` + generateImage(data[i]) + `' onerror="this.src='https://placehold.co/300x250/eeeeee/aaaaaa?text=`+data[i].name+`'; this.alt='Image missing for `+data[i].name+`'">
			</div>
			<div class='pet-card-info'> 
		    	<div class='pet-card-header'>
					<span class="pet-name">Name: `+data[i].name+`</span> 
                	<span class="pet-details">Type: `+data[i].type+` | Age: `+data[i].age+`</span>
                </div>
                <div class='pet-card-buttons'>
					<button class="btn btn-secondary">Adopt</button>
                	<button class="btn btn-secondary">Visit</button>
                </div>
			</div> 
		</article>`;
		// console.log("adding pet-block");
		// console.log("image "+getRandCat());
	}
	// if any search terms were entered, output how many results were returned
	if(document.getElementById("submit-label")) {
		if(search) {
			document.getElementById("submit-label").innerHTML = (numResults + " Results");
		} else {
			document.getElementById("submit-label").innerHTML = "&nbsp;";
		}
	}
}


function fetchJSON(jsonFile) {
	return fetch(jsonFile)
		.then(response => {
			if(!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// console.log(data);
			return data;
		})
		.catch(error => console.error('Failed to fetch data:', error));
}


function generateImage(pet) {
	let type = "";
	let num;
	if(pet.type == "Cat") {
		type = "cat";
		num = (Math.floor(Math.random()*123)+1).toString();
	} else if(pet.type == "Dog") {
		type = "dog";
		num = (Math.floor(Math.random()*13)+1).toString();
	} else {
		return pet.image;
	}
	let string = "../pet_data/Generic_"+pet.type+"_Photos/"+type+"Pics"+ num + ".jpg";
	return string;
}


function getRandCat() {
	
}


function petAgeToNum(pet) {
	let ageSplit = pet.age.split(" ");
	// console.log("pet.split(' ')[1]="+ageS`plit[1]);
	if(ageSplit[1][0] == "m") {
		return parseInt(ageSplit[0])/12;
	} else {
		return parseInt(ageSplit[0]);
	}
}

function petSort(data, sortType, sortDirection) {
	if(sortDirection == "Ascending") {
		return data = data.sort((a,b) => {
			if(sortType == "age") {
				if(petAgeToNum(a) < petAgeToNum(b)) {
					return -1;		
				}
			} else {
				if(a[sortType] < b[sortType]) {
					return -1;
				}
			}
		});
	} else if(sortDirection == "Descending") {
		return data = data.sort((a,b) => {
			if(sortType == "age") {
				if(petAgeToNum(a) > petAgeToNum(b)) {
					return -1;		
				}
			} else {
				if(a[sortType] > b[sortType]) {
					return -1;
				}
			}
		});
	}
	
}





// currently unused function that, when completed, would
// dynamically generate search boxes from the given json
// function generateSearchForm(data) {
// 	searchForm = document.getElementById('search-form');
// 	searchKeys = new Set([]);

// 	// keys we don't want to add search boxes for
// 	ignoredKeys = new Set(['id', 'name', 'image']);
// 	console.log("Search Form:");

// 	// find all pet attribute keys except those in ignoredKeys
// 	for(let i = 0; i < data.length; i++) {
// 		let keys = Object.keys(data[i]);
// 		keys.forEach(function(key) {
// 				searchKeys.add(key);
// 		});
// 	}
// 	ignoredKeys.forEach(function(key) {
// 		searchKeys.delete(key);
// 	});
// 	console.log(searchKeys);

// 	for(let i = 0; i < searchKeys.size; i++) {
// 		searchForm.innerHTML += `
// 		<select class="form-group" name="`+searchKeys[i]+`" id="`+searchKeys[i]+`">
//   			<option value="volvo">Volvo</option>
//   			<option value="saab">Saab</option>
//   			<option value="opel">Opel</option>
//   			<option value="audi">Audi</option>
// 		</select>`;
// 		console.log("adding search-option-select");
// 		// console.log("image "+getRandCat());
// 	}
// }