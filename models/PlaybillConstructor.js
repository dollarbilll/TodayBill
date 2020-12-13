class Playbill {
    constructor(id, image, pdf) {
        this.id = id;
        this.image = image;
        this.pdf = pdf; 
    }
}

export default Playbill;

//QR reader comes as a Playbill(id, uri, imageUri) with which the app 
//knows what to assign the source: item.uri / source: item.imageUri values
//for each new Playbill object which goes into the flatlist. 