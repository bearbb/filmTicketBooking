const data = [
  {
    showId: "2020-12-24",
    shows: [
      {
        showDate: "2020-12-24",
        filmName: "Tiệc Trăng Máu - Blood Moon Party",
        showTime: ["19:00", "20:00", "21:00"],
        ticketPrice: 120000,
        filmId: "1mUfOxciznbjyyFzORZN",
        cineId: "c0",
      },
      {
        ticketPrice: 120000,
        showDate: "2020-12-24",
        filmName: "Chồng Người Ta ",
        cineId: "c1",
        showTime: ["19:00", "20:00", "21:00"],
        filmId: "BzrNUU78rsfx0Tr94Ctr",
      },
    ],
  },
  {
    showId: "2020-12-25",
    shows: [
      {
        filmName: "Chồng Người Ta",
        cineId: "c1",
        showTime: ["19:00", "20:00", "21:00"],
        ticketPrice: 120000,
        filmId: "BzrNUU78rsfx0Tr94Ctr",
        showDate: "2020-12-25",
      },
    ],
  },
  {
    showId: "2020-12-26",
    shows: [
      {
        showTime: ["19:00", "20:00", "22:00"],
        showDate: "2020-12-26",
        filmId: "gbc8AEHcUYmae9UewLO5",
        cineId: "c0",
        ticketPrice: 120000,
        filmName: "TENET",
      },
      {
        showDate: "2020-12-26",
        ticketPrice: 120000,
        cineId: "c1",
        filmName: "Chồng Người Ta",
        showTime: ["19:00", "20:00", "22:00"],
        filmId: "BzrNUU78rsfx0Tr94Ctr",
      },
    ],
  },
  {
    showId: "2020-12-27",
    shows: [
      {
        showDate: "2020-12-27",
        showTime: ["19:00", "20:00", "22:00"],
        filmName: "TENET",
        ticketPrice: 90000,
        cineId: "c0",
        filmId: "gbc8AEHcUYmae9UewLO5",
      },
      {
        filmId: "kEf7buMuaq4uNprdRRyW",
        filmName: "Gia Đình Croods: Kỷ Nguyên Mới - The Croods: New Age",
        showDate: "2020-12-27",
        cineId: "c1",
        showTime: ["19:00", "20:00", "22:00"],
        ticketPrice: 90000,
      },
      {
        filmId: "mNDbhhpRxT1FY8301IfH",
        showTime: ["19:00", "20:00", "22:00"],
        ticketPrice: 90000,
        cineId: "c2",
        filmName: "Doraemon",
        showDate: "2020-12-27",
      },
    ],
  },
  {
    showId: "2020-12-28",
    shows: [
      {
        showTime: ["19:00", "20:00", "22:00"],
        ticketPrice: 90000,
        filmId: "RXWRYM20DiPHy6nTlXKI",
        cineId: "c0",
        showDate: "2020-12-28",
        filmName:
          "Violet Garden: Hồi Ức Không Quên - Violet Evergarden: The Movie",
      },
      {
        ticketPrice: 90000,
        cineId: "c1",
        filmId: "Ywn95L0NZpSR1HbnvGS8",
        showDate: "2020-12-28",
        showTime: ["19:00", "20:00", "22:00"],
        filmName: "Riam: Nữ Quái Nổi Loạn - Riam Fighting Angel",
      },
      {
        filmName: "Doraemon",
        filmId: "mNDbhhpRxT1FY8301IfH",
        ticketPrice: 90000,
        showTime: ["19:00", "20:00", "22:00"],
        cineId: "c2",
        showDate: "2020-12-28",
      },
    ],
  },
];

const filterByFilmId = (filmId, schedules) => {
  //loop through all showByDate
  let returnedData = [];
  schedules.forEach((element) => {
    let temp = {};
    temp.showDate = element.showId;
    //loop through shows array
    let shows = element.shows.filter((show) => show.filmId === filmId);
    // console.log(shows);
    temp.shows = shows;
    // console.log(shows.length);
    // console.log(temp);
    returnedData.push(temp);
  });
  //   console.log(returnedData);
  return returnedData;
};

const cineAvail = (schedulesByFilmId) => {
  let cineIds = [];
  schedulesByFilmId.forEach((element) => {
    //check if that cineId is exist in the cineIds
    element.shows.forEach((show) => {
      if (cineIds.find((cineId) => cineId === show.cineId) === undefined) {
        // console.log(show.cineId);
        cineIds.push(show.cineId);
      }
    });
  });
  console.log(cineIds);
  return cineIds;
};

// cineAvail(filterByFilmId("RXWRYM20DiPHy6nTlXKI", data));

// console.log(te[4].shows);
const filterByCineId = (cineId, schedules) => {
  //loop through all showByDate
  let returnedData = [];
  schedules.forEach((element) => {
    let temp = {};
    temp.showDate = element.showDate;
    //loop through shows array
    let shows = element.shows.filter((show) => show.cineId === cineId);
    temp.shows = shows;
    // console.log(shows);
    returnedData.push(temp);
  });
  return returnedData;
};

let te = filterByFilmId("RXWRYM20DiPHy6nTlXKI", data);

let t = filterByCineId("c0", te);
// console.log(t);

const showsMapping = (data) => {
  let returnedData = [];
  data.forEach((showByDate) => {
    let showDate = showByDate.showDate;
    let shows = [];
    if (showByDate.shows.length === 1) {
      shows = showByDate.shows[0].showTime;
    }
    let temp = {
      showDate,
      shows,
    };
    returnedData.push(temp);
  });
  return returnedData;
};

let ttt = customFunc(t);
console.log(ttt);
