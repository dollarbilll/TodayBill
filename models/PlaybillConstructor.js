class Playbill {
    constructor(id, uri, imageUri) {
        this.id = id;
        this.uri = uri;
        this.imageUri = imageUri; 
    }
}

export default Playbill;

//QR reader comes as a Playbill(id, uri, imageUri) with which the app 
//knows what to assign the source: item.uri / source: item.imageUri values
//for each new Playbill object which goes into the flatlist. 