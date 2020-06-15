export function showFormatHumman(date){
    let format = new Date(date)
    var date = format.getDate(); //Current Date
    var month = format.getMonth() + 1; //Current Month
    var year = format.getFullYear(); //Current Years
    let newDate = ('0' + date).slice(-2) + '-' + ('0' + (month + 1)).slice(-2) + '-' + year + ':' + '00' + ':' + '00';
    return newDate
  }
export function formatToProcess(date){
    let format = new Date(date)
    var date = format.getDate(); //Current Date
    var month = format.getMonth() + 1; //Current Month
    var year = format.getFullYear(); //Current Year
    let newDate = year + '-' +month + '-' + date; 
    return newDate
  }
  export function convertTimeStamp(date){
    var timeStamp = new Date(date).getTime()
    console.log('antes',date,'despues',timeStamp)
    return timeStamp

  }