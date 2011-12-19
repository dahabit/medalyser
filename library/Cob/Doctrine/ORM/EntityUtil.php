<?php

/*
 * Copyright (C) 2011 by Andrew Cobby <cobby@cobbweb.me>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

namespace Cob\Doctrine\ORM;

use Doctrine\ORM\EntityManager;

/**
 * A class for manipulating entities
 *
 * @author Andrew Cobby <cobby@cobbweb.me>
 */
class EntityUtil {
	
	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	private $em;
	
	public function __construct(EntityManager $em) {
		$this->em = $em;
	}
	
	/**
	 * Create an entity with the given data
	 *
	 * @param string|object $entity
	 * @param array $data
	 * @return object 
	 */
	public function createEntity($firstEntityObject, array $data) {
		$class = is_object ( $firstEntityObject ) ? get_class ( $firstEntityObject ) : $firstEntityObject;
		$metadata = $this->em->getClassMetadata ( $class );
		//var_dump($metadata);
		//var_dump($data);
		//$firstEntityObject = $metadata->newInstance ();
		

		foreach ( $data as $property => $value ) {
			//var_dump($value);
			if (//! $metadata->reflClass->hasProperty ( $property )
2 == 2) {
				if (is_array ( $value )) {
					//var_dump ( $value );
					$this->reformatArray ( $value );
					//var_dump ( $this->reformatArray ( $value ) );
					foreach ( $this->reformattedArray as $num1 => $val1 ) {
						$xx = "\Entities\\" . $property;
						$class2 = new $xx ();
						$metadata2 = $this->em->getClassMetadata ( get_class ( $class2 ) );
						$entity2 = $metadata2->newInstance ();
						//var_dump ( $entity2 );
						foreach ( $val1 as $num2 => $val2 ) {
							//echo $num2;
							$metadata2->setFieldValue ( $entity2, $num2, $val2 );
						
						}
					
					
					$getQuery = 'get' . $property;
					//echo $getQuery;
					//var_dump($firstEntityObject-> getPatientaddress());
					$firstEntityObject->$getQuery ()->add ( $entity2 );
					//$this->em->persist ( $entity2 );
					/* 					foreach ( $value as $property2 => $value2 ) {
						$xx = "\Entities\\" . $property;
						$class2 = new $xx ();
						$metadata2 = $this->em->getClassMetadata ( get_class ( $class2 ) );
						$entity2 = $metadata2->newInstance ();
						//var_dump($value2);
												foreach ($value2 as $property3 =>$value3){
													echo $property2;
													echo ':'.$value3;
													//$metadata2->setFieldValue ( $entity2, $property2, $value4 );
							//echo  $property2;
							
						}
						
					} */
				
				}}
			
		//throw new InvalidPropertyException("'$property' doesn't exist on '$class'");
			

			}
			if (! is_array ( $value )) {
				$metadata->setFieldValue ( $firstEntityObject, $property, $value );
			}
		
		}
		//var_dump($firstEntityObject);
		try {
			// Save the account to the database
			

			$this->em->persist ( $firstEntityObject );
			
			$this->em->flush ();
			return true;
		} catch ( Exception $e ) {
			return $e;
		}
	
		//return $entity;
	}
	public function reformatArray($array) {
		$reformattedArray = array ();
		foreach ( $array as $key => $value ) {
			foreach ( $value as $numkey => $value2 ) {
				$reformattedArray [$numkey] [$key] = $value2;
			}
		}
		$this->reformattedArray = $reformattedArray;
		return $this;
	
	}

}
