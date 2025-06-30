import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";


export const navbarLinks =[
    {
        id:1,
        title:'inicio',
        href:'/'
    },
    {
        id:2,
        title:'productos',
        href:'producto'
    },
    {
        id:3,
        title:'about',
        href:'about'
    },
];

export const socialLinks =[
    {
        id: 1,
        title: 'Facebook',
        href: 'http://www.facebook.com',
        icon: <FaFacebook/>,
    },
    {
        id: 1,
        title: 'Twitter',
        href: 'http://www.twitter.com',
        icon: <FaTwitter/>,
    },
    {
        id: 3,
        title: 'Instagram',
        href: 'http://www.Instagram.com',
        icon: <FaInstagram/>,
    }
]