
export const getHotels = async () => {
    const res = await fetch("http://localhost:5000/api/hotels/", {
      method: "GET",
    });
    if(!res.ok){
    throw new Error("Faild to fetch hotels.");
    }
    const data = await res.json();
    // console.log(data.data); // only data array 
    console.log(data);
    return data;
  
};
