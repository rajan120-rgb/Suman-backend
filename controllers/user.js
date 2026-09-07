const userData = require("../models/user")

async function handleGetData(req, res) {
    const users = await userData.find({});
    if (!users) return res.status(400).json({ msg: "Unable to get data" })
    return res.json({ msg: "Successfull getting data", data: users });

}

async function handleGetDataById(req, res) {
    const id = req.params.id;
    const users = await userData.findOne({ id: id })
    if (!users) res.status(400).json({ msg: "cannot get data" });
    return res.json({ msg: "Successfull", data: users })
}

async function handleDeleteDataById(req, res) {
    const id = req.params.id;
    const user = await userData.findOneAndDelete({ id: id });
    if (!user) {
        return res.status(404).json({
            msg: "User not found"
        });
    };
    return res.json({
        msg: "User deleted successfully",
        data: user
    });
}

async function handleUpdateDataById(req, res) {
    const id = req.params.id;

    const user = await userData.findOneAndUpdate(
        { id: id },
        {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
            profileImageUrl: req.file ? `/images/${req.file.path}` : "/images/avatar.png"
        },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    return res.json({
        msg: "User updated successfully",
        data: user
    });
}

async function hanldePostData(req, res) {
    console.log(req.file)
    const lastUser = await userData.findOne().sort({ id: -1 });
    const newUserId = lastUser ? lastUser.id + 1 : 1;
    const { fullName, email, phone, location } = req.body;
    await userData.create({
        id: newUserId,
        fullName,
        email,
        phone,
        location,
        profileImage: req.file
            ? `/images/${req.file.filename}`
            : "/images/avatar.png"
    })
    return res.json({ msg: "Success" })
}

module.exports = {
    handleGetData,
    hanldePostData,
    handleGetDataById,
    handleDeleteDataById,
    handleUpdateDataById,
}