import Playbill from './models/PlaybillConstructor';

export const PLAYBILLS = [
    new Playbill('p1', 'https://www.broadwayinhollywood.com/assets/doc/Wicked-Playbill-f9409bf2cc.pdf', 'https://static01.nyt.com/images/2013/11/04/business/playbill/playbill-articleLarge.jpg'),
    new Playbill('p2', 'https://www.broadwayinhollywood.com/assets/doc/Wicked-Playbill-f9409bf2cc.pdf', 'https://static01.nyt.com/images/2013/11/04/business/playbill/playbill-articleLarge.jpg'),
];
//apple D to select multiple of same 
//need ways to add things to this array. 

//qrscreen changes stuff in this array. 
//library screen just has behavior of loading in data using useeffect //useContext -- passing data between two non-parent components 
//useContext

//qr code adds a new object to the array

//it has to be on some http server because that's what react native etc. have support for in terms of downloading data 
