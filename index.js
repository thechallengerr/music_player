var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var playBtn = $('.function-button__play');
var playIcon = $('.function-button__play i');
var songThumb = $('.song-body .song-thumbnail');
// var song = $('#audio');
var progress = $('.duration-bar');
var audio = $('#audio');
var durationPast = $('.duration-past');
var durationLeft = $('.duration-left');
var playList = $('#playlist');
var currentSongThumb = $('.player-body .song-body .song-thumbnail');
var currentSongName = $('.player-body .song-body .song-name');
var currentSongArtist = $('.player-body .song-body .song-artist');
var currentSongAudio = $('.player-body .song-body #audio');
var next = $('.function-button__forward');
var back = $('.function-button__backward');
var repeat = $('.function-button__repeat');
var shuffle = $('.function-button__shuffle');
var playerSong = $('.player__song .player-body');
var playList = $('.player__playlist #playlist');
var favorite = $('.player__favorite i');
var upgradePlan = $('upgrade_plan');
var header = $('#header');


const app = {
    currentSongIndex: 1,
    isPlaying: false,
    isRepeated: false,
    isShuffle: false,
    songs: [
        {
            songIndex: 1,
            title: "Chân ái",
            artist: "Châu Đăng Khoa",
            url: "/assets/audio/chan_ai.mp3",
            songThumb: "/assets/img/chan_ai.webp",
        },
        {
            songIndex: 2,
            title: "Chìm Sâu",
            artist: "MCK ft. Tlinh",
            url: "/assets/audio/chim_sau.mp3",
            songThumb: "/assets/img/chim_sau.webp",
        },
        {
            songIndex: 3,
            title: "Có Em Chờ",
            artist: "MIN",
            url: "/assets/audio/co_em_cho.mp3",
            songThumb: "/assets/img/co_em_cho.webp",
        },
        {
            songIndex: 4,
            title: "Ignite",
            artist: "K319",
            url: "/assets/audio/ignite.mp3",
            songThumb: "/assets/img/ignite.jpg",
        },
        {
            songIndex: 5,
            title: "Monody",
            artist: "The Fat Rat",
            url: "/assets/audio/monody.mp3",
            songThumb: "/assets/img/monody.jpg",
        },
        {
            songIndex: 6,
            title: "Nevada",
            artist: "Vicetone",
            url: "/assets/audio/nevada.mp3",
            songThumb: "/assets/img/nevada.jpg",
        },
        {
            songIndex: 7,
            title: "Ngày Đầu Tiên",
            artist: "Đức Phúc",
            url: "/assets/audio/ngay_dau_tien.mp3",
            songThumb: "/assets/img/ngay_dau_tien.jpg",
        },
        {
            songIndex: 8,
            title: "Nơi Này Có Anh",
            artist: "Sơn Tùng M-TP",
            url: "/assets/audio/noi_nay_co_anh.mp3",
            songThumb: "/assets/img/noi_nay_co_anh.webp",
        },
        {
            songIndex: 9,
            title: "The Champion",
            artist: "Kun Aguero",
            url: "/assets/audio/the_champion.mp3",
            songThumb: "/assets/img/the_champion.jpg",
        },
        {
            songIndex: 10,
            title: "The Nights",
            artist: "Avicii",
            url: "/assets/audio/the_nights.mp3",
            songThumb: "/assets/img/the_nights.jpg",
        },
        {
            songIndex: 11,
            title: "Trên Tình Bạn Dưới Tình Yêu",
            artist: "MIN",
            url: "/assets/audio/tren_tinh_ban_duoi_tinh_yeu.mp3",
            songThumb: "/assets/img/tren_tinh_ban_duoi_tinh_yeu.jpg",
        },
        {
            songIndex: 12,
            title: "Vì Mẹ Anh Bắt Chia Tay",
            artist: "MIN",
            url: "/assets/audio/vi_me_anh_bat_chia_tay.mp3",
            songThumb: "/assets/img/vi_me_anh_bat_chia_tay.jpg",
        },
        {
            songIndex: 13,
            title: "Xích Thêm Chút - XTC",
            artist: "MCK ft. Tlinh",
            url: "/assets/audio/xich_them_chut.mp3",
            songThumb: "/assets/img/xich_them_chut.webp",
        },


    ],
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentSongIndex - 1];
            }
        })
    },
    renderPlaylist: function () {
        const _this = this;
        document.querySelector('.player__playlist p.text-pale').innerHTML = this.songs.length + `${this.songs.length < 2 ? ' song' : ' songs'}`;
        var htmls = this.songs.map((song, index) => {
            return `
            <li class="row list-group-item d-flex align-items-center justify-content-between flex-row mt-2 song-item ${index === _this.currentSongIndex - 1 ? 'song-item-active' : ''}" >
                <p class="col-sm-1 col-1 song-index ms-2">${song.songIndex}</p>
                <div class="col-sm-3 col-3 song-thumbnail"
                    style="background-image: url(${song.songThumb})"></div>
                </div>
                <div class="col-sm-3 col-3 song-name text-truncate">${song.title}</div>
                <div class="col-sm-4 col-4 song-artist text-pale">${song.artist}</div>
                <div class="col-sm-1 col-1 song-favorite">
                    <i class="fa-regular fa-heart"></i>
                </div>
            </li>`
        });
        var html = htmls.join('');
        playList.innerHTML = html;

        //scroll active song into view 

        setTimeout(function () {
            $('.song-item-active').scrollIntoView({
                behavior: "smooth", block: "nearest"
            })
        }, 300);

        // click on song
        $$('.playlist .song-item').forEach((song_item) => {
            song_item.onclick = function () {
                _this.currentSongIndex = parseInt(song_item.children[0].textContent);
                _this.renderPlaylist();
                _this.loadCurrentSong();
                _this.isPlaying = true;
                audio.play();
            }

        });


        //Favorite song

        $$('.playlist .song-item .song-favorite .fa-heart').forEach(element => {
            element.onclick = () => {
                console.log(element)
                element.style.fontWeight = '900!important';
                element.style.color = '#000';
            }
        });
    },
    playMusic: function () {
        const _this = this;
        this.handleSongProgress();

        // When play button clicked
        audio.onplay = function () {
            _this.isPlaying = true;
            songThumb.style.animationPlayState = 'running';
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }

        //when pause button clicked
        audio.onpause = function () {
            _this.isPlaying = false;
            songThumb.style.animationPlayState = 'paused';
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    },
    handleEvent: function () {
        const _this = this;

        // fixd top header 

        // Set height playlist 
        // playList.style.height = playerSong.offsetHeight + 'px';

        // Play/Pause 
        playBtn.onclick = function () {
            if (!_this.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        }


        // Auto forward songs when a song ended
        audio.onended = function () {
            if (_this.isRepeated === true) {
                audio.play();
            }
            else {
                _this.playNext();
                _this.renderPlaylist();
            }
        }


        //Repeat
        repeat.onclick = function () {
            _this.isRepeated = !_this.isRepeated;
            repeat.classList.toggle("active", _this.isRepeated);
            _this.isShuffle = false;
            shuffle.classList.remove("active");
        }


        //Shuffle
        shuffle.onclick = function () {
            _this.isRepeated = false;
            _this.isShuffle = !_this.isShuffle;
            shuffle.classList.toggle("active", _this.isShuffle);
            repeat.classList.remove("active");

        }
    },
    playRandom: function () {
        let _this = this;
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * _this.songs.length);
        } while (nextIndex === _this.currentSongIndex);
        this.currentSongIndex = nextIndex;
        console.log(this.currentSongIndex);
    },
    playNext: function () {
        if (this.isShuffle) {
            this.playRandom();
        } else {
            this.next();
        }
        this.loadCurrentSong();
        audio.play();
    },
    next: function () {
        this.currentSongIndex += 1;
        if (this.currentSongIndex > this.songs.length) {
            this.currentSongIndex = 1;
        }
    },
    nextSong: function () {
        // Next song 
        const _this = this;
        next.onclick = function () {
            if (_this.isShuffle === false) {
                _this.next();
            } else {
                _this.playRandom();
            }

            _this.loadCurrentSong();
            _this.isPlaying = true;
            audio.play();
            _this.renderPlaylist();
        }
    },
    prev: function () {
        this.currentSongIndex -= 1;
        if (this.currentSongIndex < 1) {
            this.currentSongIndex = 13;
        }
    },
    prevSong: function () {
        // Prev song
        const _this = this;
        back.onclick = function () {
            if (_this.isShuffle === false) {
                _this.prev();
            } else {
                _this.playRandom();

            }
            _this.loadCurrentSong();
            _this.isPlaying = true;
            audio.play();
            _this.renderPlaylist();
        }
    },
    handleSongProgress: function () {

        audio.ontimeupdate = function () {
            let percent = audio.currentTime ? Math.floor(audio.currentTime / audio.duration * 100) : 0;
            progress.value = percent;
            let currentTime = audio.currentTime ? audio.currentTime : 0;
            getDurationText(audio.duration, currentTime);

        }

        function toMinute(sec) {
            if (!sec) {
                return `0:00`
            }
            var s = Math.floor(sec % 60);
            var m = Math.floor((sec / 60) % 60);
            return s < 10 ? `${m}:0${s}` : `${m}:${s}`
        }

        function getDurationText(duration, currentTime) {
            durationPast.textContent = toMinute(currentTime);
            durationLeft.textContent = toMinute(duration - currentTime);
        }
        // Hanle time change
        progress.onchange = function (e) {
            console.log(e.target.value);
            audio.currentTime = e.target.value * audio.duration / 100;
            getDurationText(audio.duration, audio.currentTime);
        }
    },
    loadCurrentSong: function () {
        // $('.song-item').classList.add('active'); 
        currentSongName.textContent = this.currentSong.title;
        document.title = this.currentSong.title;
        currentSongArtist.textContent = this.currentSong.artist;
        currentSongAudio.src = this.currentSong.url;
        currentSongThumb.style.backgroundImage = 'url(' + this.currentSong.songThumb + ')';
        // audio.play();
    },
    start: function () {
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvent();
        this.nextSong();
        this.prevSong();
        this.playMusic();
        this.renderPlaylist()
    },

}


app.start();