// ---------

const appUser = {
    name: 'Dan',
    age: 35,
    permissions: [{id: 'p1', title: 'Admin', description: 'Admin acces'}]
}

type AppUser = typeof appUser

type Perms = AppUser['permissions']
type Perm = Perms[number]

type Names = string[]
type Name = Names[number]