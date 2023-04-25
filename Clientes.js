import fetch  from 'node-fetch';

const response = await fetch('http://10.20.30.3:8450/api/v1/clientes');
const clients_data = await response.json();

export default clients_data