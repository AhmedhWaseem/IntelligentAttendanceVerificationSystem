import sys
import face_recognition

known_image = face_recognition.load_image_file(sys.argv[1])
unknown_image = face_recognition.load_image_file(sys.argv[2])

biden_encoding = face_recognition.face_encodings(known_image)[0]
unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

results = face_recognition.compare_faces([biden_encoding], unknown_encoding)

print(results[0])

f = open("verify_results/result.log", "a")
f.write(sys.argv[2]+":" +str(results[0]))
f.write("\n")
f.close()

sys.stdout.flush()