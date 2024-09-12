import bcrypt from 'bcrypt';

const testPassword = async () => {
    const password = 'testPassword';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed Password:', hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password Match:', isMatch);
};

testPassword();