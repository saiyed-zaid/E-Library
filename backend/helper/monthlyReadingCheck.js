module.exports = function monthlyReadingChecker(user, canReadBook) {
  const index = user.hasRead.findIndex((read) => {
    return (
      read.added.getMonth() === new Date().getMonth() &&
      read.added.getFullYear() === new Date().getFullYear()
    );
  });

  if (index === -1) {
    user.hasRead.push({
      numberOfRead: 1,
      added: new Date(),
    });

    user.save();
  } else {
    if (user.hasRead[index].numberOfRead >= canReadBook) {
      return true;
    } else {
      user.hasRead[index].numberOfRead += 1;
      user.save();
      return false;
    }
  }
};
