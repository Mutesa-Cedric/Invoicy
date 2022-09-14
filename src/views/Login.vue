<template>
    <div class="main-container flex flex-column">
        <form @submit.prevent="login" class="flex flex-column dark-purple">
            <div class="login">
                <p>Login to your account</p>
            </div>
            <input v-model="email" type="email" placeholder="enter your email" />
            <input v-model="password" type="password" placeholder="enter password" />
            <button type="submit" class="btn btn-primary purple">
                Login
            </button>
            <div class="signup">
                <p>don't have an account?</p>
                <router-link to="/signup">Sign Up</router-link>
            </div>
            <div v-show="error">
                {{error}}
            </div>
        </form>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            error: null,
        }
    },
    methods: {
        ...mapMutations(['login']),
        async login() {
            try {
                await this.login({ email: this.email, password: this.password });
                this.$router.push('/')
            } catch (error) {
                switch (error.message) {
                    case 'auth/user-not-found':
                        this.error = 'User not found!';
                        break;
                    case 'auth/invalid-password':
                        this.error = "invalid email or password!";
                        break;
                    case 'auth/invalid-email':
                        this.error = "Email is invalid";
                        break;
                    case 'auth/internal-error':
                        this.error = "there was a server error!";
                        break;
                    default: this.error = 'Invalid email or password!';
                }
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
        padding: 60px 40px;
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
            margin: 17px 0;
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

    .login {
        color: #ccc;
        font-size: 20px;
        margin-bottom: 20px;
    }

    .signup {
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