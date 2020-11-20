export default {
    install(Vue, oprions) {
        const sounds = Array(4).fill(0).map((_, n) => {
            const file = require(`../assets/sounds/${n + 1}.ogg`)
            const audio = new Audio(file)
            audio.playbackRate = 1.5
            return audio
        })

        Vue.prototype.$play = function (n) {
            return new Promise((resolve, reject) => {
                sounds[n].onended = function () {
                    resolve()
                }
                sounds[n].play()
            })
        }
    }
}