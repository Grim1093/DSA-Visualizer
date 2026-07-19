const fs = require('fs');
const path = './src/utils/codeTemplates.ts';
let content = fs.readFileSync(path, 'utf8');

const javaOld = `    java: \`import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("\\n--- ARRAY ---");
        // TODO: Implement array
    }
}\``;

const javaNew = `    java: \`import java.util.Arrays;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Random rand = new Random();
        
        // Step 1: Initialize a random array
        int[] arr = new int[5];
        for(int i = 0; i < 5; i++) {
            arr[i] = rand.nextInt(100) + 1;
        }
        System.out.println("Original Array: " + Arrays.toString(arr));
        
        // Step 2: Array Access
        int accIdx = rand.nextInt(arr.length);
        System.out.println("Element at index " + accIdx + ": " + arr[accIdx]);
    }
}\``;

const goOld = `    go: \`package main

import "fmt"

func main() {
    fmt.Println("\\n--- ARRAY ---")
    // TODO: Implement array
}\``;

const goNew = `    go: \`package main

import (
\t"fmt"
\t"math/rand"
\t"time"
)

func main() {
\trand.Seed(time.Now().UnixNano())
\t
\t// Step 1: Initialize a random array
\tarr := make([]int, 5)
\tfor i := 0; i < 5; i++ {
\t\tarr[i] = rand.Intn(100) + 1
\t}
\tfmt.Println("Original Array:", arr)
\t
\t// Step 2: Array Access
\taccIdx := rand.Intn(len(arr))
\tfmt.Printf("Element at index %d: %d\\n", accIdx, arr[accIdx])
}\``;

const kotlinOld = `    kotlin: \`fun main() {
    println("\\n--- ARRAY ---")
    // TODO: Implement array
}\``;

const kotlinNew = `    kotlin: \`import java.util.Random

fun main() {
    val rand = Random()
    
    // Step 1: Initialize a random array
    val arr = IntArray(5) { rand.nextInt(100) + 1 }
    println("Original Array: \${arr.joinToString(", ")}")
    
    // Step 2: Array Access
    val accIdx = rand.nextInt(arr.size)
    println("Element at index $accIdx: \${arr[accIdx]}")
}\``;

content = content.replace(javaOld, javaNew);
content = content.replace(goOld, goNew);
content = content.replace(kotlinOld, kotlinNew);

fs.writeFileSync(path, content);
console.log('Successfully replaced array templates!');
