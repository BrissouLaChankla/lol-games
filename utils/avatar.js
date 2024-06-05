import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';

export const stringToAvatar = (str) => {
    if (!!!str) {
        return "";
    }

    const avatarPicture = createAvatar(micah, {
        seed: str,
    });

    return avatarPicture.toDataUriSync();
}