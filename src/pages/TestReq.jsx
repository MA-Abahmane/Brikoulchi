import axios from "axios"
export default async function TestReq() {
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        console.log('hna');
        
        const res = await axios.post('http://localhost:8000/api/auth/login', 
            { username: 'kab2', password: '12341234' }, {
            withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        console.log(e);
    }
    return <div>testReq</div>;
}