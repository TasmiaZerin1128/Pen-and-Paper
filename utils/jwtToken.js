// Create token

const sendToken = (user, statusCode, res) => {
    const accesstoken = user.getJWTToken();

    res.status(statusCode)
    .cookie("jwt", accesstoken, {secure: true, httpOnly: true})
    .json({
        success: true,
        user,
    });
}

//Remove token

const removeToken = (res) => {
    res.status(200)
    .cookie("jwt", null, {
        expiresIn: new Date(Date.now())
    }, 
    {secure: true, httpOnly: true})
    .json({
        success: true,
        message: "Logged Out"
    });
}


module.exports = { sendToken, removeToken };