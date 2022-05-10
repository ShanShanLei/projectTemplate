<template>
  <div class="topbar-wrapper" :class="{ 'topbar-open': menuToggle }">
    <img class="menu-toggle" :src="menuToggle ? menuClose : menuOpen" alt="close" @click="menuToggleFn(!menuToggle)" />
    <div class="right">
      <img class="logo" :src="user.photo || logo" />
      <el-popover placement="bottom-end" width="74" trigger="hover">
        <div slot="reference" class="logo-org">
          <span class="org">{{ user.account || '' }}</span>
        </div>
        <ul class="dropdown-list">
          <li class="list-item" v-for="(item, index) in menuList" :key="index" @click="jumpTo(item)">
            <img src="@/assets/images/topBar/exit_icon.svg" alt="icon" class="img-normal" />
            <img src="@/assets/images/topBar/exit_icon_hover.svg" alt="icon" class="img-hover" />
            <p>
              {{ item.name }}
            </p>
          </li>
        </ul>
      </el-popover>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import defaultProfile from '@/assets/images/common/default_profile.svg'
import exitIcon from '@/assets/images/topBar/exit_icon.svg'
import menuClose from '@/assets/images/topBar/menu_toggle_close.svg'
import menuOpen from '@/assets/images/topBar/menu_toggle_open.svg'

export default {
  data() {
    const logout = () => {
      return this.$request.get('/login/logout').then((data) => {
        Cookie.remove('web_linan_samc_farm_credit_token', { path: '' })
        this.$store.commit('CLEAR_USER_MESSAGE')
        return true
      })
    }
    return {
      menuOpen,
      menuClose,
      logo: defaultProfile,
      menuList: [
        {
          icon: exitIcon,
          name: '退出',
          path: '/login',
          fn: logout,
        },
      ],
    }
  },
  computed: {
    menuToggle() {
      return this.$store.state.menuToggle
    },
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    // 切换左侧导航栏
    menuToggleFn(status) {
      this.$store.commit('UPDATE_MENU_TOGGLE', status)
    },
    // 跳转个人中心某个页面
    jumpTo(item) {
      let promiseCallBack = Promise.resolve(true)
      if (item.fn) {
        promiseCallBack = item.fn()
      }
      promiseCallBack
        .then((status) => {
          if (item.path && status) {
            this.$router.push(item.path)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}

.topbar-wrapper {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 100;
  transition: width 0.5s linear 0s;

  &.topbar-open {
    width: calc(100vw - 280px);
  }

  .menu-toggle {
    cursor: pointer;
    width: 20px;
    height: auto;
  }

  .right {
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.13);
    }

    .logo-org {
      display: flex;
      align-items: center;
      cursor: pointer;

      .org {
        font-size: 14px;
        color: #171852;
        max-width: 167px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>

<style lang="scss">
.el-popover {
  padding: 0 !important;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.17);
  transform: translate(0, 18px);
  border-radius: 4px;
  min-width: initial !important;
  border: none !important;

  .dropdown-list {
    padding: 0;

    .list-item {
      padding: 0 10px;
      height: 40px;
      list-style: none;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      display: flex;
      align-items: center;
      color: #171852;
      cursor: pointer;

      img {
        width: 16px;
        height: auto;
        margin-right: 10px;

        &.img-normal {
          display: block;
        }

        &.img-hover {
          display: none;
        }
      }

      &:hover {
        color: #5b8ff9;

        img {
          &.img-hover {
            display: block;
          }

          &.img-normal {
            display: none;
          }
        }
      }
    }
  }
}
</style>
