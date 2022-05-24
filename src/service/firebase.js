import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from 'react-toastify';
import { PLACEHOLDER_IMAGE_URL } from '../utils/constans';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth();

export const getCollection = async (ref) => {
    try {
        const snapshot = await getDocs(collection(db, ref));
        const dataList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return dataList;
    } catch (err) {
        toast.error(err);
    }
};

export const createWorkshop = async (workshop) => {
    try {
        const workshopRef = doc(collection(db, "workshops"));

        await setDoc(workshopRef, {
            name: workshop.name,
            description: workshop.description,
            date: workshop.date,
            startTime: workshop.startTime,
            endTime: workshop.endTime,
            house: workshop.house,
            image: PLACEHOLDER_IMAGE_URL,
            attendees: []
        });
    } catch (err) {
        toast.error(err);
    }
};

export const createEvent = async (event) => {
    try {
        const eventRef = doc(collection(db, "events"));

        await setDoc(eventRef, {
            name: event.name,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            house: event.house,
            image: PLACEHOLDER_IMAGE_URL,
        });
    } catch (err) {
        toast.error(err);
    }
};

export const updateWorkshop = async (image, workshopId, workshop) => {
    try {
        const workshopRef = doc(db, "workshops", workshopId);

        await updateDoc(workshopRef, {
            name: workshop.name,
            description: workshop.description,
            date: workshop.date,
            startTime: workshop.startTime,
            endTime: workshop.endTime,
            house: workshop.house,
            image: image
        });
    } catch (err) {
        toast.error(err);
    }
};

export const updateEvent = async (image, eventId, event) => {
    try {
        const eventRef = doc(db, "events", eventId);

        await updateDoc(eventRef, {
            name: event.name,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            house: event.house,
            image: image
        });
    } catch (err) {
        toast.error(err);
    }
};

export const assignWorkshop = async (workshopId, userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const user = await (await getDoc(userRef)).data();

        const workshopRef = doc(db, "workshops", workshopId);

        user.workshops.find((workshop) => workshop.id === workshopId).state = 0;

        await updateDoc(workshopRef, {
            attendees: arrayUnion(userId)
        });

        await updateDoc(userRef, {
            workshops: user.workshops
        });
    } catch (err) {
        toast.error(err);
    }
};


export const updateWorkshopAttendance = async (workshopId, userId, state) => {
    try {
        const userRef = doc(db, "users", userId);
        const user = await (await getDoc(userRef)).data();

        user.workshops.find((workshop) => workshop.id === workshopId).state = state;

        await updateDoc(userRef, {
            workshops: user.workshops
        });

        // if (state === 2) {
        //     const workshopRef = doc(db, "workshops", workshopId);
        //     await updateDoc(workshopRef, {
        //         attendees: arrayRemove(userId)
        //     });
        // }
    } catch (err) {
        toast.error(err);
    }
};

export const deleteWorkshop = async (workshopId) => {
    try {
        await deleteDoc(doc(db, "workshops", workshopId));
    } catch (err) {
        toast.error(err);
    }
};

export const deleteEvent = async (eventId) => {
    try {
        await deleteDoc(doc(db, "events", eventId));
    } catch (err) {
        toast.error(err);
    }
};

export const deleteWorkshopImage = async (workshopId) => {
    try {
        const firestore = getStorage();
        const storageRef = ref(firestore, `workshops/${workshopId}`);
        await deleteObject(storageRef);
    } catch (err) {
        toast.error(err);
    }
};

export const handleImageUpload = async (uploadedFile, path) => {
    if (!uploadedFile) return;

    const firestore = getStorage();
    const storageRef = ref(firestore, path);

    try {
        await uploadBytes(storageRef, uploadedFile);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    } catch (err) {
        toast.error(err);
    }
};

export { auth, db };
