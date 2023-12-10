import { fileUpload } from "../../src/helpers/fileUpload";
import {v2 as cloudinary  } from "cloudinary";

cloudinary.config({ 
    cloud_name: 'react-images-bikcode', 
    api_key: '111448988618121', 
    api_secret: 'iJidpjRE8-d5vf_W8KAquJaKcL8',
    secure: true
  });

describe('Tests on FileUpload', () => { 
    test('should upload correctly given image', async () => {
        const imageurl = '    https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const respt = await fetch(imageurl);
        const blob = await respt.blob();
        const file = new File([blob], 'picture.jpg');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        const cloudResp = await cloudinary.api.delete_resources(['journal/'+imageId],{
            resource_type: 'image'
        });
    });

    test('should return null with a invalid file entry', async () => {
        const file = new File([], 'picture.jpg');
        try {
            await fileUpload(file);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Error uploading file')
        }
    });
 })