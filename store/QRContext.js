import * as firebase from 'firebase';
import firebaseConfig from '../utils/firebaseConfig';
firebase.initializeApp(firebaseConfig);
require("firebase/firestore");
var db = firebase.firestore();
var user = firebase.auth().currentUser;

import React, { useContext, useState, useEffect } from 'react';
import { PLAYBILLS } from '../DummyData';
import Playbill from '../models/PlaybillConstructor';
import { random } from 'lodash';

const QRContext = React.createContext()
const QRUpdateContext = React.createContext()


export function useLibraryList() {
    return useContext(QRContext)
}

export function useLibraryListUpdate() {
    return useContext(QRUpdateContext)
}

export function QRProvider({ children }) {
    const [everythingcurrentlyintheuserslibrary, seteverythingcurrentlyintheuserslibrary] = useState([])

    function addQRValue(image, pdf, id, items) {

        let newplaybilladd = new Playbill(id, image, pdf);
       
       
   
        seteverythingcurrentlyintheuserslibrary(items.concat([newplaybilladd]));
    
        console.log("EVERYTHINGINUSERSLIBRARY" + everythingcurrentlyintheuserslibrary)

        if (user != null && db.collection("users").doc(user.uid) === null) {

            db.collection("users").doc(user.uid).set({
                ID: id
            }, { merge: true })
                .then(function (docRef) {
                 
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });

        } else if (user != null && db.collection("users").doc(user.uid) != null) {

            var playbills = db.collection("users").doc(user.uid)

            playbills.update({
                pdf: firebase.firestore.FieldValue.arrayUnion(pdf),
                image: firebase.firestore.FieldValue.arrayUnion(image),
                id: firebase.firestore.FieldValue.arrayUnion(id)
            })
        }
    }

    return (
        <QRContext.Provider value={everythingcurrentlyintheuserslibrary}>
            <QRUpdateContext.Provider value={addQRValue} >
                {children}
            </QRUpdateContext.Provider>
        </QRContext.Provider>
    )
}