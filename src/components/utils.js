import { isEmpty } from "lodash";

const getAllParentCategories = (data, hideSubParents = false, hideSelectedId) => {
  let pCatgObj = {};
  let pCatArr = [];
  data.forEach(item => {
    if (!(item.data["parent"] || item.data["source"]) && hideSelectedId !== item.data.id ) {
      pCatArr.push({ label: item.data.label, value: item.data.id });
      if (!hideSubParents) {
        pCatgObj[item.data.id] = {
          label: item.data.label,
          value: item.data.id,
          options: []
        };
      }
    } else if (pCatgObj[item.data["parent"]] && !item["renderedPosition"]) {
      if (!hideSubParents) {
        pCatgObj[item.data["parent"]].options.push({
          label: item.data.label,
          value: item.data.id,
          parent: item.data.parent
        });
      }
    }
  });
  Object.keys(pCatgObj).forEach(key => {
    pCatArr.push(pCatgObj[key]);
  });
  return pCatArr;
};

const getAllServices = data => {
  let serviceData = [];

  serviceData = data.reduce(function reducer(acc, cur) {
    if (cur["renderedPosition"]) {
      acc.push({
        label: cur.data.label,
        value: cur.data.id,
        parent: cur.data.parent,
        position: {
          x: cur["renderedPosition"]['x'],
          y: cur["renderedPosition"]['y']
        }
      });
    }
    return acc;
  }, []);
  return serviceData;
};
const getFilteredData = (data, slctService) => {
  var filterServiceData = data.filter(item => {
    return slctService.toLocaleLowerCase() !== item.value.toLocaleLowerCase();
  });
  return filterServiceData;
};

const getServiceConnections = (jsonData, data, slctdObj) => {
  var finalData = [];
  jsonData.forEach(item => {
    if (item.data.source === slctdObj.value) {
      let { target } = item.data;
      let filteredData = data.filter(dt => {
        return dt.value === target;
      });

      finalData = [...finalData, ...filteredData];
    }
  });

  return finalData;
};
const getSelectedCategory = (jsonData, slctObj) => {
  var dataArr = [];
  jsonData.forEach(item => {
    if (item.data.id === slctObj.value) {
      //let { value } = slctObj;
      let { parent } = item.data;
      jsonData.forEach(dt => {
        if (dt.data.id === parent) {
          dataArr.push({
            label: dt.data.label,
            value: dt.data.id
          });
        }
      });
    }
  });

  return dataArr;
};
const getRenderedPositions = (jsonData, slctObj) => {
  var positionObj = {};
  jsonData.forEach(item => {
    if (item.data.id === slctObj.value) {
      positionObj["x"] = item.renderedPosition["x"];
      positionObj["y"] = item.renderedPosition["y"];
    }
  });

  return positionObj;
};
const changeServiceName = (jsonData, value, slctObj) => {
  jsonData.forEach((item) => {
    if (item.data.id === slctObj.value) {
      item.data.label = value
    }
  })
  return jsonData
}
const changeParentService = (jsonData, value, slctObj) => {
  jsonData.forEach((item) => {
    if (item.data.id === slctObj.value && item.data.parent === slctObj.parent) {
      item.data.parent = value
    }
  })
  return jsonData
}
const changeServicePosition = (jsonData, value, slctObj) => {
  jsonData.forEach((item) => {
    if (item.data.id === slctObj.value) {
      item.renderedPosition = value;
    }
  })
  return jsonData
}
const deleteConnection = (jsonData, obj, source) => {
  jsonData.forEach((item, rootIdx) => {
    obj.forEach((dt) => {
      if (item.data.target === dt.value && item.data.source === source) {
        jsonData.splice(rootIdx, 1)
      }
    })
  })
  return jsonData
}

const generateXYCordinates = (parentId, graphData) => {
  const positionX = [];
  const positionY = [];
  const nodeLength = 150;
  const padding = 5;
  graphData.forEach(item => {
    if (item.data["parent"] === parentId && item.renderedPosition) {
      positionX.push(item.renderedPosition['x']);
      positionY.push(item.renderedPosition['y']);
    }
  });
  let x, y = '';
  if (!isEmpty(positionX) && !isEmpty(positionY)) {
    // Find the largest x postiton and add a padding to get the new x
    x = Math.max(...positionX) + nodeLength + padding;
    // Calculate the most recurring position as the new y position
    let max = 0;
    positionY.reduce((acc, curr) => {
      if (curr in acc) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      if (max < acc[curr]) {
        max = acc[curr];
        y = curr;
      }
      return acc;
    }, {});
    y = parseInt(y);
  }
  return { x, y };
}

const deleteService = (data,id) => {
  for( var i = 0; i < data.length; i++){ 
    if(data[i].data.id === id || data[i].data.source === id || data[i].data.target === id) {
      data.splice(i, 1); 
      i--;
    }
  }
  return data;
}

const deleteServiceCategory = (data,id) => {
  if(data.findIndex(item => item.data.parent === id) === -1){
    for( var i = 0; i < data.length; i++){ 
      if(data[i].data.id === id) {
        data.splice(i, 1); 
        i--;
      }
    }
    return data;
  }
  return false;
}

export {
  getAllParentCategories,
  getAllServices,
  getFilteredData,
  getServiceConnections,
  getSelectedCategory,
  getRenderedPositions,
  changeServiceName,
  changeParentService,
  changeServicePosition,
  deleteConnection,
  generateXYCordinates,
  deleteService,
  deleteServiceCategory
};
