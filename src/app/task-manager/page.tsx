"use client"

import { db } from "@/firebase/firebase";
import {
    collection,
    addDoc,
    getDoc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
    doc,
    updateDoc
} from 'firebase/firestore';
import { useState, useEffect } from "react";

interface Task {
    title: string,
    description: string,
    dueDate: Date
}

async function addTaskToFirebase(title: string, description: string, dueDate: Date) {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            title: title,
            description: description,
            dueDate: dueDate,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.log(`Error adding doc: ${error}`);
        return false;
    }
}
