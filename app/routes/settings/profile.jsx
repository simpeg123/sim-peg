// import { useContext, useState } from 'react';
// import { UserContext } from '../settings';
// import { v4 as uuidv4 } from 'uuid';
// import { useSupabaseClient } from '@supabase/auth-helpers-react';
// import { Loader } from 'react-feather';

// function Settings() {
//     const supabase = useSupabaseClient();
//     const userContext = useContext(UserContext);
//     const [isLoading, setIsLoading] = useState(false);

//     async function saveChanges() {
//         setIsLoading(true);
//         const URL = userContext.apiURL + '/users/profile';
//         const data = {
//             id: userContext.user_id,
//             name: userContext.name,
//             email: userContext.email,
//             photo: userContext.photo,
//         };

//         alert('data = ' + JSON.stringify(data));

//         const response = await fetch(URL, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 setIsLoading(false);
//                 alert(
//                     'Perubahan profile telah disimpan, silahkan login kembali untuk melihat perubahan'
//                 );
//                 return data;
//             });

//         if (response.error) {
//             alert('terjadi kesalahan saat menyimpan perubahan');
//         }
//     }

//     async function uploadImage(e) {
//         setIsLoading(true);

//         const name = userContext.name.split(' ').join('_');
//         let file = e.target.files[0];

//         const fileName = name + '-' + uuidv4();

//         const { error } = await supabase.storage
//             .from('images')
//             .upload(fileName, file);
//         if (error) {
//             setIsLoading(false);
//             alert('terjadi masalah saat upload foto profil');
//             return;
//         }

//         const photoTemp = `https://${userContext.baseImageURL}.supabase.co/storage/v1/object/public/images/${fileName}`;
//         userContext.setPhoto(photoTemp);

//         alert('foto temp = ' + photoTemp);
//         alert('foto in context = ' + userContext.photo);

//         setIsLoading(false);
//     }

//     return (
//         <div>
//             <h1 className='m-5 text-xl font-bold'>Edit Profile</h1>

//             <div className='flex gap-2'>
//                 <div className='flex gap-2'>
//                     <div className='w-full max-w-xs p-5 ml-5 space-y-3 border rounded border-gray-400/20'>
//                         <img
//                             src={userContext.photo}
//                             alt='profile'
//                             className='object-cover w-20 h-20 mx-auto border border-2 border-blue-400 rounded-lg hover:rounded-full'
//                         />
//                         <div className='flex flex-col gap-1'>
//                             <span className='text-gray-400'>Nama</span>
//                             <input
//                                 value={name}
//                                 onChange={(e) => {
//                                     userContext.setName(e.target.value);
//                                 }}
//                                 required={true}
//                                 type='text'
//                                 placeholder='Otong Surotong'
//                                 className='w-full input input-sm input-primary'
//                             />
//                         </div>
//                         <div className='flex flex-col gap-1'>
//                             <span className='text-gray-400'>Email</span>
//                             <input
//                                 value={userContext.email}
//                                 onChange={(e) => {
//                                     userContext.setEmail(e.target.value);
//                                 }}
//                                 required={true}
//                                 type='email'
//                                 placeholder='otong@gmail.com'
//                                 className='w-full input input-sm input-primary'
//                             />
//                         </div>
//                         <div className='flex flex-col gap-1'>
//                             <span className='text-gray-400'>Jabatan</span>
//                             <input
//                                 value={userContext.role}
//                                 onChange={(e) => {
//                                     userContext.setRole(e.target.value);
//                                 }}
//                                 disabled={true}
//                                 required={true}
//                                 type='text'
//                                 placeholder='IT Manager'
//                                 className='w-full input input-sm input-primary'
//                             />
//                         </div>
//                         <div className='flex flex-col gap-1'>
//                             <span className='text-gray-400'>Foto</span>
//                             <input
//                                 onChange={(e) => {
//                                     uploadImage(e);
//                                 }}
//                                 type='file'
//                                 accept='image/*'
//                                 className='w-full file file-input file-input-sm file-input-primary'
//                             />
//                         </div>
//                         {isLoading ? (
//                             <div className='w-full btn btn-secondary'>
//                                 <Loader className='w-5 h-5 animate-spin' />
//                             </div>
//                         ) : (
//                             <button
//                                 onClick={async () => {
//                                     await saveChanges();
//                                 }}
//                                 className='w-full btn btn-secondary'
//                             >
//                                 Simpan Perubahan
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Settings;
