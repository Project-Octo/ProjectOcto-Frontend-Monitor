async function groupDataByDate(data) {
	let groupedData = {};

	// Iterate through each array in the data
	data.forEach((subArray) => {
		// Iterate through each object in the sub-array
		subArray.forEach((obj) => {
			const date = obj.date;

			// If the date is not in the groupedData, create an array for it
			if (!groupedData[date]) {
				// make date string
				groupedData[date] = [];
			}

			// Push the object to the array of the corresponding date
			groupedData[date].push(obj);
		});
	});
	return groupedData;
}

export default groupDataByDate;
