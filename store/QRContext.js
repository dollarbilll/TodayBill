import React, { useContext, useState } from 'react';
import { PLAYBILLS } from '../DummyData';
import Playbill from '../models/PlaybillConstructor';

const QRContext = React.createContext()
const QRUpdateContext = React.createContext() 

export function useLibraryList(){
    return useContext(QRContext)
}

export function useLibraryListUpdate() {
    return useContext(QRUpdateContext)
}

export function QRProvider({ children }) {
    const [everythingcurrentlyintheuserslibrary, seteverythingcurrentlyintheuserslibrary] = useState(PLAYBILLS)
    //can the state here be a collection in firestore ("user_playbills") instead of this local array?

    function addQRValue(newurl) {
        // QRCodeContents.split
        let newplaybilladd = new Playbill('newid', newurl, 'https://bsp-static.playbill.com/dims4/default/d141621/2147483647/resize/x250%3C/quality/90/?url=http%3A%2F%2Fpb-asset-replication.s3.amazonaws.com%2Fbb%2F80%2Fa7e233a14c26867a10bf0dfb566d%2Fbeetlejuice-playbill-2019-03-28-web.jpg');
        // console.log({newurl, everythingcurrentlyintheuserslibrary, newplaybilladd});
        seteverythingcurrentlyintheuserslibrary(everythingcurrentlyintheuserslibrary.concat([newplaybilladd]))
    }
  
    return(
        <QRContext.Provider value={everythingcurrentlyintheuserslibrary}>
            <QRUpdateContext.Provider value={addQRValue} >
            {children}
            </QRUpdateContext.Provider>
        </QRContext.Provider>
    )
}