let globalIP = "192.168.230.232:3030"; // Ensure it's a string

export const setGlobalIP = (value) => {
    globalIP = value;
};

export const getGlobalIP = () => globalIP;