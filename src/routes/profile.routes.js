import express from "express";
import { Profile } from "../models/profile.model.js";

export const router = express.Router();

//MIDDLEWARE
const getProfile = async(req, res, next) => { 
    let profile;
    const { id } = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json (
            {
                message: 'The ID of the profile is not valid'
            }
        )
    }

    try {
        profile = await Profile.findById(id);
        if(!profile) {
            return res.status(404).json(
                {
                    message: 'The profile was not found'
                }
            )
        }
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        )

    }

    res.profile = profile;
    next();
}

//Get the information of the profile [GET ALL]
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find();
        console.log('These are the profiles: ', profiles);
        if (profiles.length === 0) {
            return res.status(204).json([])
        }
        res.json(profiles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


//Create a new profile [POST]
router.post('/', async(req, res) => {
    const { name, age, gender, description } = req?.body;
    if(!name || !age) {
        return res.status(400).json({
            message: 'You must to write a name and age'
        })
    }

    const profile = new Profile(
        {
            name,
            age,
            gender,
            description
        }
    )

    try {
        const newProfile = await profile.save();
        console.log('This is the new profile created: ', newProfile);
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.get('/:id', getProfile, async(req, res) => {
    res.json(res.profile);
})

router.put('/:id', getProfile, async(req, res) => {
    try {
        const profile = res.profile;
        profile.name = req.body.name || profile.name;
        profile.age = req.body.age || profile.age;
        profile.gender = req.body.gender || profile.gender;
        profile.description = req.body.description || profile.description;

        const updateProfile = await profile.save()
        res.json(updateProfile);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.patch('/:id', getProfile, async(req, res) => {

    if(!req.body.name && !req.body.age && !req.body.gender && !req.body.description) {
        res.status(400).json({
            message: 'Some parameter is missing (Name, Age, Gender, Description).'
        })
    }
    try {
        const profile = res.profile;
        profile.name = req.body.name || profile.name;
        profile.age = req.body.age || profile.age;
        profile.gender = req.body.gender || profile.gender;
        profile.description = req.body.description || profile.description;

        const updateProfile = await profile.save()
        res.json(updateProfile);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.delete('/:id', getProfile, async(req, res) => {
    try {
        const profile = res.profile;
        await profile.deleteOne({
            _id: profile._id
        });
        res.json({
            message: `The book ${profile.name} has been deleted.`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})