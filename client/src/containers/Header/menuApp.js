export const adminMenu = [
    { // quan ly nguoi dung
        name: 'menu.admin.manage',
        menus: [
            {
                name: 'menu.admin.admin-manage', link: '/system/admin-manage'
            },
            {
                name: 'menu.admin.staff-manage', link: '/system/staff-manage'
            },
            {
                name: 'menu.staff.booking-manage-plan', link: '/staff/booking-manage-plan'
            },
        ]
    },
    { // quan ly rap phim
        name: 'menu.admin.cinema',
        menus: [
            {
                name: 'menu.admin.cinema-tech-manage', link: '/system/cinema-tech-manage'
            },


        ]
    },
    // { // quan ly the loai
    //     name: 'menu.admin.genre',
    //     menus: [
    //         {
    //             name: 'menu.admin.genre-manage', link: '/system/genre-manage'
    //         }

    //     ]
    // },
    { // quan ly phim
        name: 'menu.admin.film',
        menus: [
            {
                name: 'menu.admin.film-manage', link: '/system/film-manage'
            },
            {
                name: 'menu.admin.buy-combos', link: '/system/buy-combos'
            },
            {
                name: 'menu.admin.payment-type', link: '/system/payment-type'
            }
        ]
    },
    { // quan ly phim dang chieu
        name: 'menu.admin.post-film',
        menus: [
            {
                name: 'menu.admin.post-now-showing-manage', link: '/system/post-now-showing-manage'
            }

        ]
    },
    { // quan ly tin tuc
        name: 'menu.admin.news',
        menus: [
            {
                name: 'menu.admin.news-manage', link: '/system/news-manage'
            }

        ]
    },
    { // quan ly banner
        name: 'menu.admin.banner',
        menus: [
            {
                name: 'menu.admin.banner-manage', link: '/system/banner-manage'
            }

        ]
    },
    { // quan ly HOA DON
        name: 'menu.admin.bill',
        menus: [
            {
                name: 'menu.admin.bill-manage', link: '/system/bill-manage'
            }

        ]
    },
    { // quan ly thong tin phim
        name: 'menu.admin.information',
        menus: [
            {
                name: 'menu.admin.information-manage', link: '/system/information-manage'
            }

        ]
    }

];
export const staffMenu = [
    {
        name: 'menu.staff.manage',
        menus: [
            { // quan ly nguoi dung dat lich xem phim
                // name: 'menu.staff.manage',
                // menus: [
                //     {
                name: 'menu.staff.booking-manage-plan', link: '/staff/booking-manage-plan'
                //     },
                // ]
            },
        ]
    }

];
export const manageMyUser = [
    {
        name: 'menu.manageMyUser.my-user',
        menus: [
            {
                name: 'menu.manageMyUser.my-user', link: '/manage-my-user/my-user'
            }

        ]
    },

];