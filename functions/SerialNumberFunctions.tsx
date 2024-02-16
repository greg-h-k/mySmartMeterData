

export function isSerialNumberValid(serialNumber: string) {
    // serial number should be 16 digits and contain only letters and numbers
    // user should not enter - or : from the mac code 
    if (serialNumber.length != 16) {
        return false;
    } else {
        return /^[A-Za-z0-9]*$/.test(serialNumber);
    }
}