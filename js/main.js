let tZone = new Date();
let options = { timeZone: "America/Los_Angeles", timeZoneName: "short" };
let strTime = tZone.toLocaleDateString("en-US", options);
let dateFromStrTime = new Date(strTime);

document.querySelector('#dateField').valueAsDate = dateFromStrTime;

document.querySelector('button').addEventListener('click', getDate)
picOfDay()
function picOfDay(){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=Eyhk4dI0qp2fedZVgoTIkaKmyOvXOg1rcip4HdcJ`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)

          let reformatDate = data.date.split('-')
          let newDate = [reformatDate[1], reformatDate[2], reformatDate[0]]
          newDate = newDate.join('/')
          console.log(newDate)
          if(data.media_type === "image"){
            if(document.querySelector('.nasa-img').classList.contains('hidden')){
                document.querySelector('.nasa-img').classList.toggle('hidden')
            }
            document.querySelector('iframe').classList.add('hidden')
            document.querySelector('.nasa-img').src = data.hdurl // display img
          }
          else if(data.media_type === "video"){
            if(document.querySelector('iframe').classList.contains('hidden')){
              document.querySelector('iframe').classList.toggle('hidden')
            }
            document.querySelector('.nasa-img').classList.add('hidden')
            document.querySelector('iframe').src = data.url // display video
          }
          document.querySelector('#apodDate').innerText = `${newDate}`
          document.querySelector('#apodName').innerText = `"${data.title}"`
          document.querySelector('#explanation').innerText = data.explanation
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }

  function getDate(){
    let date = document.querySelector('input').value
    const url = `https://api.nasa.gov/planetary/apod?api_key=Eyhk4dI0qp2fedZVgoTIkaKmyOvXOg1rcip4HdcJ&date=${date}`

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)

          let reformatDate = data.date.split('-')
          let newDate = [reformatDate[1], reformatDate[2], reformatDate[0]]
          newDate = newDate.join('/')

          if(!data.media_type){
            alert(data.msg)
            picOfDay()
          }
          else if(data.media_type === "image"){
            if(document.querySelector('.nasa-img').classList.contains('hidden')){
                document.querySelector('.nasa-img').classList.toggle('hidden')
            }
            document.querySelector('iframe').classList.add('hidden')
            document.querySelector('.nasa-img').src = data.hdurl // display img
          }
          else if(data.media_type === "video"){
            if(document.querySelector('iframe').classList.contains('hidden')){
              document.querySelector('iframe').classList.toggle('hidden')
            }
            document.querySelector('.nasa-img').classList.add('hidden')
            document.querySelector('iframe').src = data.url // display video
          }
          document.querySelector('#apodDate').innerText = `${newDate}`
          document.querySelector('#apodName').innerText = `"${data.title}"`
          document.querySelector('#explanation').innerText = data.explanation
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }


