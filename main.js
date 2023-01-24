setInterval(clock,1000);
function clock()
{
    let h=document.getElementById('hours');
    let m=document.getElementById('minutes');
    let s=document.getElementById('seconds');
    let ampm=document.getElementById('ampm');
    let h1=new Date().getHours();
    let m1=new Date().getMinutes();
    let s1=new Date().getSeconds();
   var am='AM';

if(h1>12){

    h1=h1-12;
    var am='PM'
}
h1=(h1<10)?'0'+h1:h1;
m1=(m1<10)?'0'+m1:m1;
s1=(s1<10)?'0'+s1:s1;
   h.innerHTML =h1;
   m.innerHTML =m1;
   s.innerHTML =s1;
   ampm.innerHTML =am;
   
}
$("#list_items").on("click", "a", function(e) {
    e.preventDefault();
    document.getElementById('tym').style.display="block";
    document.getElementById('search_btn').style.display="none";
    var vk=$(this).text();
    $('#testing').html(vk);
    var link="https://api.timezonedb.com/v2.1/get-time-zone?key=8T1JAYIGIM3P&format=json&by=zone&zone="+vk;    
    fetch(link).then((getdata) => {
        return getdata.json();
    })
    .then((timedata) =>{
       z_clock();
        function z_clock() {  
        var zonetym =  timedata.formatted;
        var newtime = zonetym.split(" ")[1];
        var HH=newtime.split(":");
        let h=document.getElementById('z_hours');
        let m=document.getElementById('z_minutes');
        let s=document.getElementById('z_seconds');
        let ampm=document.getElementById('z_ampm');
        let h1=parseInt(HH[0]);
        let m1=parseInt(HH[1]);
        let s1=parseInt(HH[2]); 
        var am='AM';
        if(h1>12){
        h1=h1-12;
        var am='PM'
         }
        h1=(h1<10)?'0'+h1:h1;
        m1=(m1<10)?'0'+m1:m1;
        s1=(s1<10)?'0'+s1:s1;
        h.innerHTML =h1;
        m.innerHTML =m1;
        s.innerHTML =s1;
        ampm.innerHTML =am;
       }
            
    }).catch((error)=>{
        console.log("nothing much");
    });
 
});
 
//addd search
const add = () =>{
document.getElementById('zone').style.display = "none";
document.getElementById('search_btn').style.display = "block ";

}


//api fetching.....
fetch('https://api.timezonedb.com/v2.1/list-time-zone?key=8T1JAYIGIM3P&format=json')

.then((apidata) => {
    return apidata.json();
})
.then((actualdata) =>{
    var text=[];
    console.log(actualdata);
    for(let i=0;i<418;i++)
    {
        text.push(actualdata.zones[i].zoneName);
        text.sort();
    }
    for(let i=0;i<418;i++){
    const list= document.getElementById('list_items');
    var li1 = document.createElement("li");
    var newa=document.createElement("a"); 
    list.appendChild(li1);
    li1.appendChild(newa);  
    li1.setAttribute("class","zoneNames");
    li1.setAttribute("id","li"+i); 
    newa.setAttribute("href","#");
    newa.innerHTML=text[i];
    }

}).catch((error)=>{
    console.log("nothing much",error);
});



//searching

const searchZones = () =>{
    var filter=document.getElementById('search_text').value.toUpperCase();
    //console.log(filter);
    let ul=document.getElementById('list_items');
    let li = ul.getElementsByTagName('li');
    for(var i=0; i<li.length;i++)
    {
      let la=  li[i].getElementsByTagName('a')[0];
      let textvalue= la.textContent || la.innerHTML;
      if(textvalue.toUpperCase().indexOf(filter)>-1)
      {
          li[i].style.display="";
      }else{
        li[i].style.display="none";
      }
    }   
}

const addMoreZones = () => {
    document.getElementById('search_text').value='';
    searchZones();
    document.getElementById('tym').style.display = "none";
    document.getElementById('search_btn').style.display = "block ";
}