const { User } = require('./models');
const { sequelize } = require('./models');

async function checkUsers() {
  try {
    await sequelize.authenticate();
    const users = await User.findAll({ attributes: ['username', 'role'] });
    console.log('Current Users in DB:');
    users.forEach(u => console.log(`- ${u.username} (${u.role})`));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkUsers();
