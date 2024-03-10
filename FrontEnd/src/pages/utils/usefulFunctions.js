//GET TERM DEPNDS ON SYSTEM TIME
export const getTerm = () => {
  const currentMonthIndex = new Date().getMonth();
  // 0-indexed (January is 0, February is 1, ..., December is 11)
  if (currentMonthIndex >= 0 && currentMonthIndex <= 3) {
    return 1;
  } else if (currentMonthIndex >= 4 && currentMonthIndex <= 7) {
    return 2;
  } else if (currentMonthIndex >= 8 && currentMonthIndex <= 11) {
    return 3;
  } else {
    console.error('Invalid month index:', currentMonthIndex);
    return 1;
  }
}

export const countAcademicDays = () => {
  const year = new Date(Date.now()).getFullYear(); // Fixed missing parentheses
  let startDate = new Date(`01-01-${year}`); // Use 'new Date' to create a Date object
  const endDate = new Date(); // Use the current date

  const academicDaysCount = Array
    .from({ length: (endDate - startDate) / (1000 * 3600 * 24) + 1 }) // Added +1 to include the end date
    .reduce((count) => {
      if (startDate.getDay() % 6 !== 0 && startDate.getDay() % 7 !== 0) {
        // Check for weekdays (Monday to Friday)
        count++;
      }
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      return count;
    }, 0);

  return academicDaysCount; // Return the result
}


export const getProfileImageSrc = (gender = 'male') => {
  const urls = [
    'https://pics.craiyon.com/2023-07-05/fc5f288ac75d46d99a3cf1d77175504f.webp',
    'https://pics.craiyon.com/2023-07-18/dd8997a63e03445c850401ae5e63072b.webp',
    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/165844201/original/c0aee438ce5e30b854ad37a9d90157f53cf3bb52/create-the-profile-cartoon-pictures.png',
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/165844201/original/4016c67b352a94765a5026b6105649d17065585f/create-the-profile-cartoon-pictures.png',
    'https://i.pinimg.com/236x/cc/e1/db/cce1db594930d2217fc4f484434742d9.jpg',
    'https://i.pinimg.com/236x/9e/8d/f9/9e8df9cce81187bb1880db31bd028b6c.jpg',
    'https://e0.pxfuel.com/wallpapers/17/326/desktop-wallpaper-theodoro-russell-cute-boy-cute-cartoon-girl-cute-cartoon-boy.jpg',
    'https://i.pinimg.com/736x/5e/29/97/5e29973bb6ea05121a8310c25803830b.jpg',
    'https://i.pinimg.com/originals/20/30/20/203020a9332cf5ee64b95a5c80f9ed66.jpg',
    'https://i.pinimg.com/236x/9e/8d/f9/9e8df9cce81187bb1880db31bd028b6c.jpg'

  ]
  const girlUrls = [
    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/165844201/original/577d81e73b99747e2e583c83a6cb188e6bc52ed9/create-the-profile-cartoon-pictures.png',
    'https://1.bp.blogspot.com/-ctWUkEF_26Q/XnGjRrZkT3I/AAAAAAAADnY/-EyWBxN-UPsTWf9APGTUgoXgTIaXPAyygCLcBGAsYHQ/s1600/cartoon-dp-for-whatsapp-for-girls.jpg',
    'https://i.pinimg.com/736x/17/d8/3f/17d83f0f0936dc2547667cf40c9e0ecd.jpg',
    'https://i.pinimg.com/originals/42/c6/22/42c62228dc68879dd3c93eec1393b6f9.jpg',
    'https://i.pinimg.com/originals/5d/3a/eb/5d3aeb340bf3af7f5f44f4124954d5fe.jpg',
    'https://i.pinimg.com/736x/15/d7/30/15d7300d30ae3efc34b93a7b00a194a8.jpg',
    'https://i.pinimg.com/736x/97/7f/c9/977fc9c010a1ee949ea8490db2437f1c.jpg',
    'https://i.pinimg.com/736x/61/81/17/6181175b7043497579718c56a95de934.jpg',
    'https://i.pinimg.com/736x/16/9d/11/169d119adb4303fff64c69f825a8846c.jpg',
    'https://i.pinimg.com/564x/82/a5/b8/82a5b8f4bbb7d8274e592266122220a2.jpg',
  ]

  const randomNumber = (Math.random() * 10).toFixed()
  console.log(randomNumber);
  if(gender == 'male'){
    return urls[randomNumber]
  }else{
    return girlUrls[randomNumber]
  }


}