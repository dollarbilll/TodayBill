import React, { useContext, useState, useEffect } from 'react';
import { PLAYBILLS } from '../DummyData';
import Playbill from '../models/PlaybillConstructor';
import { random } from 'lodash';

const QRContext = React.createContext()
const QRUpdateContext = React.createContext() 

// import * as firebase from 'firebase';
// var db = firebase.firestore();
// var user = firebase.auth().currentUser;



export function useLibraryList(){
    return useContext(QRContext)
}

export function useLibraryListUpdate() {
    return useContext(QRUpdateContext)
}

export function QRProvider({ children }) {
    const [everythingcurrentlyintheuserslibrary, seteverythingcurrentlyintheuserslibrary] = useState(PLAYBILLS)

    // initializing library with current user's playbills from firestore 
    useEffect(
        () => {
            const loadUserData = async() => { 
                const playbillFirestore = await db.get(everythinginthatcollectionuid)
                seteverythingcurrentlyintheuserslibrary(playbillFirestore) 
            }
            loadUserData()            
            // console.log(playbillFirestore)
        }, []
    )

    function addQRValue(qrdataContext) {
        
        let qrContextArray = qrdataContext.toString().split(",");
        // let qrContextArray = qrdataContext;
        console.log("qrContextArray" + qrContextArray)
        console.log("qrdataContext" + qrdataContext)

        let image = qrContextArray[0];
        let pdf = qrContextArray[1];
        let id = qrContextArray[2];
        let newplaybilladd = new Playbill(id, image, pdf);
        // console.log("pdf" + pdf)
        // console.log("image" + image)
        // console.log("id" + id)
        console.log("newplaybilladd" + newplaybilladd)
        seteverythingcurrentlyintheuserslibrary(everythingcurrentlyintheuserslibrary.concat([newplaybilladd]));
        // console.log(everythingcurrentlyintheuserslibrary)
        console.log(PLAYBILLS)
    }
  
    return(
        <QRContext.Provider value={everythingcurrentlyintheuserslibrary}>
            <QRUpdateContext.Provider value={addQRValue} >
            {children}
            </QRUpdateContext.Provider>
        </QRContext.Provider>
    )
}