import axios from "axios";

export default axios.create({
    baseURL: "http://ec2-18-170-91-239.eu-west-2.compute.amazonaws.com/api",
    headers: {
        "Content-type": "application/json",
    },
});