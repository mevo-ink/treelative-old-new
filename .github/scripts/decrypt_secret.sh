#!/bin/sh

# Decrypt the file

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$DECRYPT_PASSPHRASE" --output src/sever/utils/firebaseAuth.json src/sever/utils/firebaseAuth.json.gpg
