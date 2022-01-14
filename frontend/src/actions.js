const { default: axios } = require("axios");



// const addProduct = async (formData) => {
//     setLoading(true);
//     try {
//         const {data} = await axios.post('http://localhost:5000/api/product/create', formData, {
//             headers: {
//                     Authorization: `Bearer ${cookie.get('access_token')}`
//             }
//         });

//         if(data.error) {
//             setMessage(data.error)
//             setError(true)
//             setLoading(false)
//             return;
//         }

//         setMessage(data.message);
//         setLoading(false)
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//         setError(true)
//         setLoading(false)
//     }
// }