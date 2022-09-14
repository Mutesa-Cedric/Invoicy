<template>
    <div class="main-container flex flex-column">

        <form @submit.prevent="signup()" class="flex flex-column dark-purple">
            <div class="create-account">
                <p>Create account</p>
            </div>
            <input type="email" v-model="email" placeholder="enter your email address" />
            <input type="text" v-model="name" placeholder="enter your username" />
            <input typ="password" v-model="password" placeholder="choose password" />
            <button type="submit" class="btn btn-primary purple">
                Sign Up
            </button>
            <div class="login">
                <p>already have an account?</p>
                <router-link to="/login">Login</router-link>
            </div>
            <div v-show="error" class="error">
                {{error}}
            </div>
        </form>

    </div>

</template>

<script>

import { mapActions } from 'vuex';
import { useRouter } from 'vue-router';
const router = useRouter();
export default {
    name: "Signup",
    data() {
        return {
            email: '',
            password: '',
            name: '',
            error: null,
        }

    },
    methods: {
        ...mapActions(['register']),
        async signup() {
            try {
                await this.register({
                    email: this.email,
                    password: this.password,
                    name: this.name
                });
                router.push('/');
            } catch (err) {
                this.error = err.message;
            }
        }
    }
}
</script>

<style scoped lang="scss">
.main-container {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    form {
        width: 100%;
        max-width: 500px;
        justify-content: center;
        align-items: center;
        padding: 40px;
        border-radius: 10px;

        button {
            width: 100%;
            margin-top: 20px;
            border-radius: 10px;
        }

        input {
            width: 100%;
            padding: 10px;
            height: 50px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        input::placeholder {
            color: #ccc;
            padding-left: 10px;
        }

        input:focus {
            outline: none;
        }
    }

    .error {
        color: red;
        margin-top: 10px;
    }

    .create-account {
        color: #ccc;
        font-size: 20px;
        margin-bottom: 20px;
    }

    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 16px;
        font-size: 12px;

        p {
            color: azure;
            padding-right: 6px;
        }

        a {
            font-weight: 900;
            color: antiquewhite;
        }
    }
}
</style>