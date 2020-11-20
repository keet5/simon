<template>
    <div class="simon-game">
        <div
            v-for="(color, n) of buttons"
            :key="n"
            :ref="color"
            @click="pressButton(n)"
            :class="color"
            class="button"
        ></div>
        <div class="black-circle">
            {{ round }}
            <div class="control-panel">
                <button @click="changeDifficulty(-1)"></button>
                {{ currentLevel + 1 }}
                <button @click="changeDifficulty(1)"></button>
            </div>
            <button @click="start">start</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SimonGame",
    data() {
        return {
            buttons: ["blue", "red", "yellow", "green"],
            sequence: [],
            access: false,
            currentN: 0,
            level: [1500, 1000, 400],
            currentLevel: 0,
            round: 0
        };
    },
    methods: {
        start() {
            this.reset();
            this.runRound();
        },
        async runRound() {
            this.round++
            this.access = false;
            this.sequence.push(Math.round(Math.random() * 3));
            await this.playSequence();
            this.currentN = 0;
            this.access = true;
        },
        async buttonAction(n) {
            this.access = false;
            const color = this.buttons[n];
            this.$refs[color][0].style["background-color"] = "white";
            await this.$play(n);
            this.$refs[color][0].style["background-color"] = "";
            this.access = true;
        },
        async playSequence() {
            for (let i of this.sequence) {
                await new Promise((resolve) =>
                    setTimeout(async () => {
                        await this.buttonAction(i);
                        resolve();
                    }, this.level[this.currentLevel])
                );
            }
        },
        async pressButton(n) {
            if (this.access) {
                await this.buttonAction(n);
                if (n != this.sequence[this.currentN]) {
                    this.reset();
                } else if (this.currentN == this.sequence.length - 1) {
                    this.runRound();
                } else {
                    this.currentN++;
                }
            }
        },
        reset() {
            this.sequence = [];
            this.currentN = 0;
            this.access = false;
            this.round = 0
        },
        changeDifficulty(n) {
            this.currentLevel += n;
            if (this.currentLevel < 0) this.currentLevel = 0;
            else if (this.currentLevel >= this.level.length)
                this.currentLevel = this.level.length - 1;
        },
    },
};
</script>

<style scoped lang="sass">
$size: 500px
.simon-game
    height: $size
    width: $size
    margin: auto
    display: grid
    flex-wrap: wrap
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    border-radius: $size / 2
    background-color: black
    padding: 20px
    grid-gap: 20px
    position: relative
    box-sizing: border-box
    .button
        &:active
            border: 5px solid black

    .blue
        background-color: blue
        border-radius: 100% 0 0 0
    .red
        background-color: red
        border-radius: 0 100% 0 0
    .yellow
        background-color: yellow
        border-radius: 0 0 0 100%
    .green
        background-color: green
        border-radius: 0 0 100% 0
    .black-circle
        $center-size:  $size / 2
        $offset: ($size - $center-size) / 2
        position: absolute
        height: $center-size
        width: $center-size
        background-color: black
        border-radius: 50%
        left: $offset
        top: $offset
        display: flex
        
        flex-direction: column
        justify-content: center
        align-items: center
        color: yellow
        font-size: 30px
        button
            color: yellow
            background-color: rgba(0, 0, 0, 0)
            border: none
            height: 50px
            font-size: 40px
        .control-panel
            display: flex
            width: 100%
            justify-content: space-around
            align-items: center
            button 
                background-color: yellow
                height: 50px
                width: 25px
                border-radius: 12.5px
                border: none
</style>
